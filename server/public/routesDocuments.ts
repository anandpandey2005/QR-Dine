
export const routesDocumentation: any =
{
    "apiRoutes": {
        "auth": [
            { "method": "POST", "path": "/api/auth/login", "description": "Staff login (Manager, Chef, Ground Staff)" },
            { "method": "POST", "path": "/api/auth/logout", "description": "Invalidate session" },
            { "method": "POST", "path": "/api/auth/forgot-password", "description": "send reset link on their email" },
            { "method": "POST", "path": "/api/auth/reset-password", "description": "update password" },
        ],
        "otp": [
            { "method": "POST", "path": "/api/otp/send", "description": "Send OTP to customer email" },
            { "method": "POST", "path": "/api/otp/verify", "description": "Verify OTP and create customer session token" }
        ],
        "Category": [
            { "method": "GET", "path": "/api/categories", "description": "List all menu categories" },
            { "method": "POST", "path": "/api/categories", "description": "Create new category (Manager Only)" },
            { "method": "PATCH", "path": "/api/categories/:id", "description": "update category (Manager Only)" },
            { "method": "DELETE", "path": "/api/categories/:id", "description": "delete category (Manager Only)" },
        ],
        "product": [
            { "method": "GET", "path": "/api/products", "description": "List all products (can filter by category)" },
            { "method": "POST", "path": "/api/products", "description": "Add new menu item (Manager Only)" },
            { "method": "PATCH", "path": "/api/products/:id", "description": "Update price/availability (Manager Only)" },
            { "method": "DELETE", "path": "/api/products/:id", "description": "Delete menu item (Manager Only)" }
        ],
        "cart": [
            { "method": "GET", "path": "/api/cart", "description": "Get current user's cart" },
            { "method": "POST", "path": "/api/cart/add", "description": "Add product to cart" },
            { "method": "PATCH", "path": "/api/cart/update/:productId", "description": "Update item quantity in cart" },
            { "method": "DELETE", "path": "/api/cart/remove/:productId", "description": "Remove item from cart" }
        ],
        "order": [
            { "method": "POST", "path": "/api/orders", "description": "Save order details to database (Pending Payment)" },
            { "method": "GET", "path": "/api/orders", "description": "List orders" },
            { "method": "GET", "path": "/api/orders/:id", "description": "Get specific order status" }
        ],
        "payment": [
            { "method": "POST", "path": "/api/payment/create-razorpay-order", "description": "Talks to Razorpay API to generate an Order ID" },
            { "method": "POST", "path": "/api/payment/verify-signature", "description": "Verifies the payment was legit and updates your DB" }
        ],
        "chef": [
            { "method": "GET", "path": "/api/chef/orders", "description": "Get active orders to cook" },
            { "method": "PATCH", "path": "/api/chef/orders/:id/status", "description": "Update status (Pending -> Preparing -> Ready)" }
        ],
        "groundStaff": [
            { "method": "GET", "path": "/api/groundstaff/tables", "description": "View status of all tables" },
            { "method": "PATCH", "path": "/api/groundstaff/orders/:id/serve", "description": "Mark order as served to table" }
        ],
        "manager": [
            { "method": "GET", "path": "/api/manager/dashboard", "description": "View overall sales and stats" },
            { "method": "GET", "path": "/api/manager/staff", "description": "List all staff members" },
            { "method": "POST", "path": "/api/manager/staff", "description": "Add new Chef or Ground Staff" }
        ],
        "customer": [
            { "method": "GET", "path": "/api/customer/profile", "description": "Get customer details" },
            { "method": "GET", "path": "/api/customer/history", "description": "View past orders" }
        ]

    }
}