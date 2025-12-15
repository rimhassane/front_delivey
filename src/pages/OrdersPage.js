import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

// Données de démonstration - À remplacer par un appel API
const mockOrders = [
  {
    id: 'ORD-12345',
    date: '2023-12-05',
    status: 'livrée',
    restaurant: 'Le Petit Bistrot',
    items: [
      { name: 'Steak frites', quantity: 1, price: 15.90 },
      { name: 'Crème brûlée', quantity: 1, price: 6.50 },
    ],
    total: 22.40,
  },
  {
    id: 'ORD-12344',
    date: '2023-12-03',
    status: 'en cours',
    restaurant: 'Pizza Napoli',
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 12.50 },
      { name: 'Tiramisu', quantity: 1, price: 5.50 },
      { name: 'Coca-Cola', quantity: 2, price: 3.00 },
    ],
    total: 24.00,
  },
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'en cours':
      return 'primary';
    case 'livrée':
      return 'success';
    case 'annulée':
      return 'error';
    default:
      return 'default';
  }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simuler un chargement asynchrone
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mes Commandes
      </Typography>
      
      {!user ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Connectez-vous pour voir l'historique de vos commandes
          </Typography>
          <Button variant="contained" color="primary" href="/login">
            Se connecter
          </Button>
        </Box>
      ) : orders.length === 0 ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Vous n'avez pas encore passé de commande
          </Typography>
          <Button variant="contained" color="primary" href="/restaurants">
            Découvrir les restaurants
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 3 }}>
          {orders.map((order) => (
            <Card key={order.id} sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="h6" component="div">
                      Commande #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(order.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Box>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  {order.restaurant}
                </Typography>
                
                <List dense>
                  {order.items.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem disableGutters>
                        <ListItemText
                          primary={`${item.quantity}x ${item.name}`}
                          secondary={`${(item.price * item.quantity).toFixed(2)} €`}
                        />
                      </ListItem>
                      {index < order.items.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
                
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Typography variant="h6">
                    Total: {order.total.toFixed(2)} €
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    disabled={order.status === 'annulée'}
                  >
                    Suivre ma commande
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={order.status === 'annulée'}
                  >
                    Commander à nouveau
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default OrdersPage;
