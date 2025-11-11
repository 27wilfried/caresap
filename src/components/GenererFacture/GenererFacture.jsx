import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoPath from "../../assets/logo-caresap.png";

export function generateInvoice(commande) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const doc = new jsPDF();
  const image = new Image();
  image.src = logoPath;

  // Infos Société
  const company = {
    name: "CaRESaP",
    address: "Parakou, Banikanni, Rép. du Bénin",
    phone: "+229 01 94 98 17 85",
    email: "contact@caresap.org",
    logo: image,
  };

  const vente = commande;
  const client = vente.Client;
  const produits = vente.Ressources;

  const date = formatDate(vente.date);
  const invoiceNumber = `FACT-${vente.id_vente.toString().padStart(4, "0")}`;

  // ✅ Logo (si en base64)
  doc.addImage(company.logo, "PNG", 28, 10, 20, 20);

  // ✅ En-tête Société
  doc.setFontSize(14);
  doc.text(company.name, 50, 15);
  doc.setFontSize(10);
  doc.text(company.address, 50, 20);
  doc.text(`Tél: ${company.phone}`, 50, 25);
  doc.text(`Email: ${company.email}`, 50, 30);

  // ✅ Infos Facture
  doc.setFontSize(12);
  doc.text(`Facture N° : ${invoiceNumber}`, 150, 15);
  doc.text(`Date : ${date}`, 150, 20);
  doc.text(`Client : ${client.nom}`, 150, 25);
  doc.text(`Téléphone : ${client.contact}`, 150, 30);

  // ✅ Tableau Produits
  const tableRows = produits.map((p, index) => [
    index + 1,
    p?.titre,
    p?.DetailVente?.quantite,
    p?.prix,
    p?.DetailVente?.quantite * p?.prix,
  ]);

  autoTable(doc, {
    startY: 40,
    head: [["#", "Produit", "Quantité", "Prix Unitaire", "Total"]],
    body: tableRows,
  });

  // ✅ Total
  doc.setFontSize(12);
  doc.text(
    `Montant Total: ${vente.montant_total} FCFA`,
    150,
    doc.lastAutoTable.finalY + 10,
    { align: "right" }
  );

  // ✅ Signature
  doc.text("Signature Responsable", 15, doc.lastAutoTable.finalY + 30);

  // ✅ Sauvegarder ou ouvrir
  doc.save(`${invoiceNumber}.pdf`);
}
