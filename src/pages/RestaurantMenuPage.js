import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuItem from '../components/menu/MenuItem';

// Données de démonstration - À remplacer par un appel API
const mockRestaurant = {
  id: 1,
  name: 'Le Petit Bistrot',
  cuisine: 'Française',
  rating: 4.5,
  deliveryTime: '30-45 min',
  image: 'https://source.unsplash.com/random/800x400?restaurant,french',
  menu: {
    Entrées: [
      {
        id: 1,
        name: 'Salade César',
        description: 'Laitue romaine, croûtons, parmesan, sauce césar',
        price: 8.90,
        isPopular: true,
        allergens: 'Lait, gluten, œufs, poisson (anchois)',
      },
      {
        id: 2,
        name: 'Tartare de saumon',
        description: 'Saumon frais, avocat, citron vert, coriandre',
        price: 10.50,
        isPopular: true,
        allergens: 'Poisson',
      },
    ],
    Plats: [
      {
        id: 3,
        name: 'Steak frites',
        description: 'Entrecôte de bœuf 250g, frites maison, sauce au poivre',
        price: 18.90,
        isPopular: true,
        allergens: 'Lait, gluten',
      },
      {
        id: 4,
        name: 'Poulet rôti',
        description: 'Cuisse de poulet rôtie, gratin dauphinois, légumes de saison',
        price: 15.50,
        allergens: 'Lait',
      },
    ],
    Desserts: [
      {
        id: 5,
        name: 'Crème brûlée',
        description: 'Crème vanille et sa couche de sucre caramélisé',
        price: 6.50,
        isPopular: true,
        allergens: 'Lait, œufs',
      },
      {
        id: 6,
        name: 'Fondant au chocolat',
        description: 'Cœur coulant, glace vanille',
        price: 7.20,
        allergens: 'Lait, œufs, gluten',
      },
    ],
    Boissons: [
      {
        id: 7,
        name: 'Eau minérale',
        description: '50cl',
        price: 2.50,
      },
      {
        id: 8,
        name: 'Soda',
        description: '33cl - Au choix : Coca-Cola, Fanta, Sprite, Ice Tea',
        price: 3.00,
      },
    ],
  },
};

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Entrées');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d'un chargement asynchrone
    const timer = setTimeout(() => {
      setRestaurant(mockRestaurant);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          return acc;
        }
        acc.push(item);
        return acc;
      }, [])
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getFilteredItems = () => {
    if (!restaurant) return [];
    
    const categoryItems = restaurant.menu[activeTab] || [];
    
    if (!searchTerm) return categoryItems;
    
    const searchLower = searchTerm.toLowerCase();
    return categoryItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        (item.description && item.description.toLowerCase().includes(searchLower))
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography>Chargement du menu...</Typography>
      </Box>
    );
  }

  if (!restaurant) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6">Restaurant non trouvé</Typography>
        <Button onClick={() => navigate('/restaurants')} sx={{ mt: 2 }}>
          Retour à la liste des restaurants
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pb: 8 }}>
      {/* En-tête */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <IconButton 
          onClick={() => navigate(-1)}
          sx={{ position: 'absolute', left: 0, top: 16, zIndex: 1, bgcolor: 'rgba(255,255,255,0.8)' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box 
          sx={{
            height: 200,
            backgroundImage: `url(${restaurant.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            mb: 2,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 2,
            },
          }}
        />
        <Box sx={{ position: 'relative', textAlign: 'center', mt: -4, mb: 3 }}>
          <Paper elevation={3} sx={{ p: 2, display: 'inline-block', minWidth: 300 }}>
            <Typography variant="h4" component="h1">
              {restaurant.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {restaurant.cuisine} • {restaurant.rating} ⭐ • {restaurant.deliveryTime}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Barre de recherche */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher dans le menu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Onglets des catégories */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Menu categories"
        >
          {Object.keys(restaurant.menu).map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
      </Box>

      {/* Liste des plats de la catégorie sélectionnée */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          {activeTab}
        </Typography>
        
        {getFilteredItems().length > 0 ? (
          getFilteredItems().map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              onAddToCart={handleAddToCart} 
            />
          ))
        ) : (
          <Typography color="text.secondary" textAlign="center" py={4}>
            Aucun plat trouvé dans cette catégorie.
          </Typography>
        )}
      </Box>

      {/* Panier flottant */}
      {cart.length > 0 && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={
              <Badge badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            }
            onClick={() => setIsCartOpen(true)}
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              boxShadow: 3,
            }}
          >
            Voir mon panier • {getCartTotal().toFixed(2)} €
          </Button>
        </Box>
      )}

      {/* Panier latéral */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        PaperProps={{
          sx: { width: '100%', maxWidth: 400 },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Mon panier</Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        
        {cart.length === 0 ? (
          <Box textAlign="center" p={4}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Votre panier est vide
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Parcourez notre menu et ajoutez des plats délicieux
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setIsCartOpen(false)}
              startIcon={<RestaurantMenuIcon />}
            >
              Voir le menu
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {cart.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.price.toFixed(2)} € × ${item.quantity}`}
                    />
                    <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleRemoveFromCart(item.id)}
                        sx={{ mr: 1 }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ minWidth: 24, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => handleAddToCart(item)}
                        sx={{ ml: 1 }}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {getCartTotal().toFixed(2)} €
                </Typography>
              </Box>
              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                onClick={() => {
                  // Rediriger vers la page de commande
                  navigate('/checkout');
                }}
              >
                Commander maintenant
              </Button>
            </Box>
          </>
        )}
      </Drawer>
    </Container>
  );
};

export default RestaurantMenuPage;
