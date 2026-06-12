require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./src/models/Recipe');
const User = require('./src/models/User');
const Review = require('./src/models/Review');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Recipe.deleteMany({});
  await User.deleteMany({});
  await Review.deleteMany({});
  console.log('Collections cleared');

  const user = await User.create({
    name: 'Chef Demo',
    email: 'chef@recipeapp.com',
    password: '$2b$10$placeholder_hashed_password',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    bio: 'Apasionado por la cocina internacional.'
  });

  const recipes = await Recipe.insertMany([
    {
      name: 'Tacos al Pastor',
      description: 'Tacos mexicanos con carne de cerdo marinada en achiote y piña.',
      category: 'Mexicana',
      area: 'México',
      ingredients: [
        { name: 'Carne de cerdo', amount: '500g' },
        { name: 'Achiote', amount: '2 cdas' },
        { name: 'Piña', amount: '1/2 pieza' },
        { name: 'Tortillas de maíz', amount: '12 piezas' },
        { name: 'Cebolla', amount: '1 pieza' },
        { name: 'Cilantro', amount: 'al gusto' },
        { name: 'Limón', amount: '3 piezas' }
      ],
      instructions: 'Marina la carne con achiote, jugo de piña, ajo y especias por 4 horas. Asa en trompo o sartén a fuego alto. Sirve en tortillas con cebolla, cilantro y piña asada.',
      imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
      prepTime: 30,
      difficulty: 'Media',
      author: user._id
    },
    {
      name: 'Pasta Carbonara',
      description: 'Pasta italiana cremosa con huevo, queso pecorino y panceta.',
      category: 'Italiana',
      area: 'Italia',
      ingredients: [
        { name: 'Spaghetti', amount: '400g' },
        { name: 'Panceta', amount: '150g' },
        { name: 'Huevos', amount: '4 piezas' },
        { name: 'Queso pecorino', amount: '100g' },
        { name: 'Pimienta negra', amount: 'al gusto' },
        { name: 'Sal', amount: 'al gusto' }
      ],
      instructions: 'Cuece la pasta al dente. Fríe la panceta hasta que esté crujiente. Mezcla huevos con queso rallado. Apaga el fuego y combina pasta con panceta, luego agrega la mezcla de huevo fuera del fuego. Añade pimienta generosamente.',
      imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
      prepTime: 25,
      difficulty: 'Media',
      author: user._id
    },
    {
      name: 'Guacamole',
      description: 'Dip mexicano de aguacate fresco con tomate, cebolla y chile.',
      category: 'Mexicana',
      area: 'México',
      ingredients: [
        { name: 'Aguacate', amount: '3 piezas' },
        { name: 'Tomate', amount: '1 pieza' },
        { name: 'Cebolla blanca', amount: '1/4 pieza' },
        { name: 'Chile serrano', amount: '1 pieza' },
        { name: 'Cilantro', amount: '2 ramas' },
        { name: 'Limón', amount: '1 pieza' },
        { name: 'Sal', amount: 'al gusto' }
      ],
      instructions: 'Aplasta el aguacate con un tenedor dejando trozos. Pica fino el tomate, cebolla, chile y cilantro. Mezcla todo, agrega jugo de limón y sal al gusto. Sirve inmediatamente.',
      imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=800',
      prepTime: 10,
      difficulty: 'Fácil',
      author: user._id
    },
    {
      name: 'Sushi Rolls',
      description: 'Rollos de arroz japonés con salmón, pepino y aguacate.',
      category: 'Japonesa',
      area: 'Japón',
      ingredients: [
        { name: 'Arroz para sushi', amount: '2 tazas' },
        { name: 'Salmón fresco', amount: '200g' },
        { name: 'Pepino', amount: '1 pieza' },
        { name: 'Aguacate', amount: '1 pieza' },
        { name: 'Alga nori', amount: '4 hojas' },
        { name: 'Vinagre de arroz', amount: '3 cdas' },
        { name: 'Salsa de soya', amount: 'al gusto' }
      ],
      instructions: 'Cocina el arroz y sazona con vinagre de arroz. Coloca nori sobre estera de bambú, extiende arroz, agrega relleno y enrolla con firmeza. Corta en 8 piezas con cuchillo húmedo.',
      imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800',
      prepTime: 45,
      difficulty: 'Difícil',
      author: user._id
    },
    {
      name: 'Enchiladas Verdes',
      description: 'Tortillas rellenas de pollo bañadas en salsa verde cremosa.',
      category: 'Mexicana',
      area: 'México',
      ingredients: [
        { name: 'Tortillas de maíz', amount: '12 piezas' },
        { name: 'Pechuga de pollo', amount: '400g' },
        { name: 'Tomatillos', amount: '500g' },
        { name: 'Chile poblano', amount: '2 piezas' },
        { name: 'Crema', amount: '200ml' },
        { name: 'Queso fresco', amount: '100g' },
        { name: 'Cebolla', amount: '1 pieza' }
      ],
      instructions: 'Cuece y deshebra el pollo. Licúa tomatillos asados, chile y cebolla para la salsa verde. Calienta la salsa con crema. Rellena tortillas con pollo, baña con salsa y hornea 10 min a 180°C. Decora con crema y queso.',
      imageUrl: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800',
      prepTime: 40,
      difficulty: 'Media',
      author: user._id
    },
    {
      name: 'Tiramisú',
      description: 'Postre italiano con capas de bizcocho, café y mascarpone.',
      category: 'Postres',
      area: 'Italia',
      ingredients: [
        { name: 'Bizcochos savoiardi', amount: '200g' },
        { name: 'Queso mascarpone', amount: '500g' },
        { name: 'Huevos', amount: '4 piezas' },
        { name: 'Azúcar', amount: '100g' },
        { name: 'Café espresso', amount: '200ml' },
        { name: 'Cacao en polvo', amount: 'al gusto' },
        { name: 'Ron', amount: '2 cdas' }
      ],
      instructions: 'Separa yemas y claras. Bate yemas con azúcar hasta blanquear, incorpora mascarpone. Bate claras a punto de nieve y mezcla suavemente. Moja bizcochos en café con ron. Alterna capas de bizcocho y crema. Refrigera 4 horas y espolvorea cacao.',
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
      prepTime: 30,
      difficulty: 'Media',
      author: user._id
    },
    {
      name: 'Pad Thai',
      description: 'Fideos de arroz tailandeses salteados con camarón, huevo y cacahuate.',
      category: 'Tailandesa',
      area: 'Tailandia',
      ingredients: [
        { name: 'Fideos de arroz', amount: '300g' },
        { name: 'Camarones', amount: '200g' },
        { name: 'Huevos', amount: '2 piezas' },
        { name: 'Salsa de tamarindo', amount: '3 cdas' },
        { name: 'Salsa de pescado', amount: '2 cdas' },
        { name: 'Cacahuates', amount: '50g' },
        { name: 'Cebollín', amount: '3 ramas' }
      ],
      instructions: 'Remoja los fideos 30 min. Saltea camarones en wok a fuego alto. Aparta, fríe huevos revueltos. Agrega fideos escurridos, salsa de tamarindo y pescado. Mezcla todo, sirve con cacahuates triturados y cebollín.',
      imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
      prepTime: 35,
      difficulty: 'Media',
      author: user._id
    },
    {
      name: 'Brownie de Chocolate',
      description: 'Brownie húmedo y denso con costra crujiente y centro fudgy.',
      category: 'Postres',
      area: 'Estados Unidos',
      ingredients: [
        { name: 'Chocolate oscuro', amount: '200g' },
        { name: 'Mantequilla', amount: '150g' },
        { name: 'Azúcar', amount: '250g' },
        { name: 'Huevos', amount: '3 piezas' },
        { name: 'Harina', amount: '80g' },
        { name: 'Cacao en polvo', amount: '30g' },
        { name: 'Sal', amount: '1 pizca' }
      ],
      instructions: 'Derrite chocolate con mantequilla a baño maría. Bate huevos con azúcar hasta espumar. Incorpora la mezcla de chocolate. Agrega harina, cacao y sal tamizados. Hornea en molde engrasado a 175°C por 25 minutos.',
      imageUrl: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800',
      prepTime: 40,
      difficulty: 'Fácil',
      author: user._id
    },
    {
      name: 'Ceviche de Camarón',
      description: 'Camarones marinados en limón con pepino, jitomate y aguacate.',
      category: 'Mariscos',
      area: 'México',
      ingredients: [
        { name: 'Camarones cocidos', amount: '500g' },
        { name: 'Jugo de limón', amount: '1 taza' },
        { name: 'Jitomate', amount: '2 piezas' },
        { name: 'Pepino', amount: '1 pieza' },
        { name: 'Aguacate', amount: '1 pieza' },
        { name: 'Cebolla morada', amount: '1/2 pieza' },
        { name: 'Cilantro', amount: 'al gusto' }
      ],
      instructions: 'Marina camarones en jugo de limón 20 minutos. Pica en cubos el jitomate, pepino, cebolla y aguacate. Mezcla todo con cilantro picado, sal y una pizca de chile. Sirve frío con tostadas.',
      imageUrl: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800',
      prepTime: 25,
      difficulty: 'Fácil',
      author: user._id
    },
    {
      name: 'Pizza Margherita',
      description: 'Pizza napolitana clásica con salsa de tomate, mozzarella y albahaca.',
      category: 'Italiana',
      area: 'Italia',
      ingredients: [
        { name: 'Masa para pizza', amount: '1 bola 280g' },
        { name: 'Salsa de tomate', amount: '80ml' },
        { name: 'Mozzarella fresca', amount: '200g' },
        { name: 'Albahaca fresca', amount: '8 hojas' },
        { name: 'Aceite de oliva', amount: '2 cdas' },
        { name: 'Sal', amount: 'al gusto' }
      ],
      instructions: 'Estira la masa en círculo delgado. Extiende salsa de tomate dejando 1cm de borde. Distribuye mozzarella en trozos. Hornea en horno muy caliente (250°C) 8-10 min hasta que el borde esté dorado. Agrega albahaca fresca y aceite de oliva al sacar.',
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
      prepTime: 20,
      difficulty: 'Media',
      author: user._id
    }
  ]);

  console.log(`✓ Usuario creado: ${user.email}`);
  console.log(`✓ ${recipes.length} recetas insertadas`);
  console.log('Seed completado.');
  await mongoose.disconnect();
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
