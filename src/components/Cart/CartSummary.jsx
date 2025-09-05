import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKKiaPay } from "kkiapay-react";
import { useNavigate } from "react-router-dom";
import {
  selectEmail,
  selectIsLoggedIn,
  selectToken,
  selectUserID,
  selectUserName,
} from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { CLEAR_CART, selectCartItems } from "../../redux/slice/cartSlice";
import { createData, host } from "../../helpers/fonctions";

const CartSummary = ({ montant }) => {
  const idClient = useSelector(selectUserID);
  const isLogin = useSelector(selectIsLoggedIn);
  const emailUser = useSelector(selectEmail);
  const nameUser = useSelector(selectUserName);
  const token = useSelector(selectToken);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearCart = (product) => {
    dispatch(CLEAR_CART());
  };

  const { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } =
    useKKiaPay();

  const refundPayment = async (transactionId) => {
    console.log("Déclenchement remboursement pour transaction:", transactionId);

    try {
      const refundRes = await fetch(`${host}/api/kkiapay/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
      }).then((res) => res.json());

      console.log("Réponse remboursement:", refundRes);

      toast.error("Commande non effectuée. Le paiement a été annulé.", {
        position: "top-left",
      });
    } catch (refundErr) {
      console.error("Erreur lors du remboursement:", refundErr);
      toast.error(
        "Commande non effectuée. Échec du remboursement.Veillez contacter notre service.",
        {
          position: "top-left",
        }
      );
    }
  };

  const handleSuccess = (response) => {
    console.log("KKiapay success:", response);

    if (!response?.transactionId) {
      console.error("Aucun transactionId reçu !");
      return;
    }

    // Vérifier le paiement côté serveur
    fetch(`${host}/api/kkiapay/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId: response.transactionId }),
    })
      .then((r) => r.json())
      .then(async (data) => {
        console.log("Réponse de vérification:", data);

        if (data?.tx?.status === "SUCCESS") {
          console.log("Paiement validé, tentative de création de commande...");

          try {
            const result = await createData(
              "private/client/create-vente",
              {
                date: Date.now(),
                id_client: idClient,
                ressources: cartItems,
                montant_total: montant,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("Résultat de createCommande:", result);

            // Si l'API retourne un échec logique
            if (result?.success === false) {
              throw new Error("Commande échouée côté backend");
            }

            clearCart();
            navigate("/payment");
            toast.error("Commande effectuée avec succès.", {
              position: "top-left",
            });
          } catch (error) {
            console.error("Erreur lors de la création de la commande:", error);
            await refundPayment(response.transactionId); // remboursement
          }
        } else {
          console.warn("Le paiement n'est pas valide:", data?.tx?.status);

          toast.error("Le paiement n'a pas été validé.", {
            position: "top-left",
          });
        }
      })
      .catch((err) => {
        console.error("Erreur vérification paiement:", err);

        toast.error("Impossible de vérifier le paiement.", {
          position: "top-left",
        });
      });
  };

  // Handler échec widget
  const handleFailed = (error) => {
    console.error("KKiapay échec:", error);
  };

  useEffect(() => {
    addKkiapayListener("success", handleSuccess);
    addKkiapayListener("failed", handleFailed);
    return () => {
      removeKkiapayListener("success", handleSuccess);
      removeKkiapayListener("failed", handleFailed);
    };
  }, [addKkiapayListener, removeKkiapayListener]);

  const open = () => {
    openKkiapayWidget({
      amount: montant, // Montant total de la commande
      name: nameUser,
      currency: "XOF", // Devise
      description: `Paiement pour ${nameUser}`, // Description de la transaction
      key: "9c017490632b11f0b9dd6b5ae46fe3b0", // ou key: publicKey si nécessaire
      sandbox: true,
      email: emailUser,
      phone: "97000000",
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 sticky top-28">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-4">
        Résumé de la commande
      </h2>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between items-center">
          <p>Sous-total</p>
          <p className="font-semibold">{montant} fcfa</p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200 text-xl font-bold text-gray-900">
          <h3>Total</h3>
          <h3>{montant} fcfa</h3>
        </div>
      </div>

      <button
        className="mt-6 w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={
          () => (isLogin ? open() : navigate("/auth")) // Ouvre le widget Kkiapay
        }
      >
        Passer à la caisse
      </button>
    </div>
  );
};

export default CartSummary;
