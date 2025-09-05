export const initialOrders = [
    {
        id: "order-001",
        customerId: "cust-001",
        customerName: "Alice Dubois",
        date: "2024-08-10",
        total: 399.98,
        products: [
            {
                productId: "form-001",
                productName: "Data Science pour la Santé Publique",
                quantity: 1,
                price: 299.99,
            },
            {
                productId: "art-001",
                productName: "Fibromyalgie et VIH",
                quantity: 5,
                price: 19.99,
            },
        ],
    },
    {
        id: "order-002",
        customerId: "cust-002",
        customerName: "Jean Dupont",
        date: "2024-08-12",
        total: 109.99,
        products: [
            {
                productId: "book-001",
                productName: "Épidémiologie Pratique : Guide Complet...",
                quantity: 1,
                price: 89.99,
            },
            {
                productId: "supp-001",
                productName: "Théorie SPECTRE VIH",
                quantity: 1,
                price: 39.99,
            },
        ],
    },
    {
        id: "order-003",
        customerId: "cust-003",
        customerName: "Marie Lebrun",
        date: "2024-08-14",
        total: 299.99,
        products: [
            {
                productId: "form-002",
                productName: "Introduction aux Essais Cliniques",
                quantity: 1,
                price: 199.99,
            },
        ],
    },
    // Vous pouvez ajouter d'autres commandes ici si vous le souhaitez
];