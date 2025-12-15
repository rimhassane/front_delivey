import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Données de démonstration - À remplacer par un appel API
const mockRestaurants = [
  {
    id: 1,
    name: 'Le Petit Bistrot',
    cuisine: 'Française',
    rating: 4.5,
    deliveryTime: '30-45 min',
    image: 'https://source.unsplash.com/random/400x300?restaurant,french',
  },
  {
    id: 2,
    name: 'Pizza Napoli',
    cuisine: 'Italienne',
    rating: 4.2,
    deliveryTime: '25-40 min',
    image: 'https://source.unsplash.com/random/400x300?restaurant,italian',
  },
  {
    id: 3,
    name: 'Sushi Master',
    cuisine: 'Japonaise',
    rating: 4.7,
    deliveryTime: '35-50 min',
    image: 'https://source.unsplash.com/random/400x300?restaurant,japanese',
  },
];

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simuler un chargement asynchrone
    const timer = setTimeout(() => {
      setRestaurants(mockRestaurants);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nos Restaurants Partenaires
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher un restaurant ou une cuisine..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={4}>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {restaurant.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {restaurant.cuisine}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Box display="flex" alignItems="center">
                      <Box color="warning.main" mr={1}>★</Box>
                      <Typography variant="body2">
                        {restaurant.rating} ({Math.floor(Math.random() * 100)} avis)
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.deliveryTime}
                    </Typography>
                  </Box>
                </CardContent>
                <Box p={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    component={RouterLink}
                    to={`/restaurant/${restaurant.id}/menu`}
                  >
                    Voir le menu
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Box width="100%" textAlign="center" p={4}>
            <Typography variant="h6" color="text.secondary">
              Aucun restaurant ne correspond à votre recherche.
            </Typography>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default RestaurantsPage;
