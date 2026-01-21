const MENU_DATA = {
    "burgers": [
        {
            id: "fiery_chicken",
            name: "Fiery Chicken Burger",
            price: 650,
            image: "assets/thumbnails/Fiery-Chicken.png",
            description: "Spicy grilled chicken with jalapeños, pepper jack cheese, and chipotle mayo.",
            category: "burgers",
            model_glb: "assets/models/sandwich.glb",
            model_usdz: "assets/models/Fast_Food_Set.usdz", // Swapped to smaller file (5MB) to test AR stability
            ar_scale: "0.5 0.5 0.5", // Increased scale for better visibility
            recommendations: ["loaded_fries", "coca_cola"]
        },
        {
            id: "mushroom_swiss",
            name: "Mushroom Swiss Burger",
            price: 750,
            image: "assets/thumbnails/Mushroom-Swiss.png",
            description: "Sautéed mushrooms, melted Swiss cheese, caramelized onions on a brioche bun.",
            category: "burgers",
            model_glb: "assets/models/sandwich.glb",
            model_usdz: "assets/models/Fast_Food_Set.usdz", // Swapped to smaller file (5MB)
            ar_scale: "0.5 0.5 0.5", // Increased scale
            recommendations: ["onion_rings", "fresh_lemonade"]
        },
        {
            id: "crispy_wings",
            name: "Crispy Buffalo Wings",
            price: 550,
            image: "assets/thumbnails/crispy-wings.png",
            description: "8 pieces of crispy chicken wings tossed in spicy buffalo sauce.",
            category: "burgers",
            model_glb: "assets/models/fast_food_set.glb",
            model_usdz: "assets/models/Fast_Food_Set.usdz",
            ar_scale: "0.2 0.2 0.2", // Adjust for wings basket
            recommendations: ["golden_fries", "mint_margarita"]
        }
    ],
    "pizza": [
        {
            id: "pizza_classic",
            name: "Classic Margherita Pizza",
            price: 950,
            image: "assets/thumbnails/pizza.png",
            description: "Fresh mozzarella, basil, and tomato sauce on hand-tossed dough.",
            category: "pizza",
            // Add 3D model here! 👇
            model_glb: "assets/models/pizza.glb",
            model_usdz: "assets/models/pizza.usdz",
            ar_scale: "0.35 0.35 0.1", // Pizza size: 14-inch diameter
            recommendations: ["coca_cola", "mineral_water"]
        }
    ],
    "sides": [
        {
            id: "golden_fries",
            name: "Golden Crispy Fries",
            price: 250,
            image: "assets/thumbnails/golden-fries.png",
            category: "sides",
            description: "Perfectly seasoned golden fries with a crispy exterior.",
            model_glb: "assets/models/fast_food_set.glb",
            model_usdz: "assets/models/Fast_Food_Set.usdz",
            ar_scale: "0.2 0.2 0.2" // Fries basket size
        },
        {
            id: "loaded_fries",
            name: "Loaded Cheese Fries",
            price: 450,
            image: "assets/thumbnails/loaded-fries.png",
            category: "sides",
            description: "Topped with melted cheddar, jalapeños, bacon bits, and ranch sauce.",
            model_glb: "assets/models/fast_food_set.glb",
            model_usdz: "assets/models/Fast_Food_Set.usdz",
            ar_scale: "0.2 0.2 0.2" // Fries basket size
        },
        {
            id: "onion_rings",
            name: "Beer-Battered Onion Rings",
            price: 300,
            image: "assets/thumbnails/onion-rings.png",
            category: "sides",
            description: "Thick-cut onion rings with crispy beer batter coating."
        }
    ],
    "drinks": [
        {
            id: "coca_cola",
            name: "Coca-Cola",
            price: 100,
            image: "assets/thumbnails/coca-cola.png",
            category: "drinks",
            description: "Classic refreshing Coca-Cola, served chilled.",
            // 3D AR Model Added! 🥤
            model_glb: "assets/models/coca_cola.glb",
            model_usdz: "assets/models/coca_cola.usdz",
            ar_scale: "0.08 0.08 0.12" // Can size: diameter x diameter x height
        },
        {
            id: "zero_coca_cola",
            name: "Coca-Cola Zero",
            price: 100,
            image: "assets/thumbnails/zero-coca-cola.png",
            category: "drinks",
            description: "Zero sugar, same great taste."
        },
        {
            id: "fresh_lemonade",
            name: "Fresh Mint Lemonade",
            price: 150,
            image: "assets/thumbnails/fresh-lemnade.png",
            category: "drinks",
            description: "Freshly squeezed lemons with mint and ice."
        },
        {
            id: "mint_margarita",
            name: "Mint Margarita",
            price: 200,
            image: "assets/thumbnails/mint-margrita.png",
            category: "drinks",
            description: "Refreshing blend of mint, lemon, and soda."
        },
        {
            id: "mineral_water",
            name: "Mineral Water",
            price: 50,
            image: "assets/thumbnails/mineral-water.png",
            category: "drinks",
            description: "Pure mineral water, 500ml bottle."
        }
    ]
};

// Helper function to find any item by ID
function getItemById(id) {
    for (const cat in MENU_DATA) {
        const found = MENU_DATA[cat].find(item => item.id === id);
        if (found) return found;
    }
    return null;
}