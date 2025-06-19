import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Card,
  CardContent,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Link as MuiLink
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  ShoppingCart,
  Payment,
  LocalShipping,
  Security,
  Help,
  Description,
  MenuBook,
  Receipt,
  Menu as MenuIcon,
  Restore,
  Build,
  Assignment,
  SwapHoriz
} from '@mui/icons-material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.02em'
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '0.02em'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '0.01em'
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      letterSpacing: '0.01em'
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.8,
      letterSpacing: '0.01em'
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.section-title': {
            fontWeight: 600,
            color: '#1976d2',
            marginBottom: '1rem'
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1.1rem',
          fontWeight: 500,
          marginBottom: '0.5rem'
        },
        secondary: {
          fontSize: '1rem',
          color: 'rgba(0, 0, 0, 0.7)'
        }
      }
    }
  }
});

const sections = [
  { id: 'introduction', title: 'Introduction', icon: <Description /> },
  { id: 'produit', title: 'Produit', icon: <ShoppingCart /> },
  { id: 'prix', title: 'Prix et Devis', icon: <Receipt /> },
  { id: 'commande', title: 'Commande', icon: <MenuBook /> },
  { id: 'paiement', title: 'Paiement', icon: <Payment /> },
  { id: 'reservation', title: 'Politique de Réservation', icon: <Assignment /> },
  { id: 'livraison', title: 'Livraison', icon: <LocalShipping /> },
  { id: 'retractation', title: 'Rétractation', icon: <SwapHoriz /> },
  { id: 'garantie', title: 'Garantie', icon: <Security /> },
  { id: 'sav', title: 'Service Après-Vente', icon: <Build /> },
  { id: 'retour', title: 'Retours et Remboursements', icon: <Restore /> },
  { id: 'contact', title: 'Contact', icon: <Help /> }
];

const CGV = () => {
  const [activeSection, setActiveSection] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionElements = sections.map(section => ({
        id: section.id,
        offset: document.getElementById(section.id)?.offsetTop - 100
      }));

      const currentSection = sectionElements.reverse().find(section => section.offset <= scrollPosition);
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setDrawerOpen(false);
    }
  };

  const TableOfContents = () => (
    <List>
      {sections.map((section) => (
        <ListItem 
          key={section.id}
          button
          onClick={() => scrollToSection(section.id)}
          sx={{
            borderLeft: activeSection === section.id ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
            bgcolor: activeSection === section.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.08)',
            }
          }}
        >
          <Box sx={{ mr: 2, color: activeSection === section.id ? 'primary.main' : 'text.secondary' }}>
            {section.icon}
          </Box>
          <ListItemText 
            primary={section.title} 
            sx={{ 
              color: activeSection === section.id ? 'primary.main' : 'text.primary',
              '& .MuiTypography-root': {
                fontWeight: activeSection === section.id ? 600 : 400
              }
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'grey.50',
        minHeight: '100vh',
        pt: 4,
        pb: 8,
        fontFamily: theme.typography.fontFamily
      }}>
        {isMobile && (
          <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
            <IconButton 
              onClick={() => setDrawerOpen(true)}
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'background.paper' }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box' }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Table des matières
            </Typography>
            <TableOfContents />
          </Box>
        </Drawer>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {!isMobile && (
              <Grid item md={3}>
                <Paper 
                  sx={{ 
                    position: 'sticky',
                    top: 32,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: '1.2rem',
                      color: 'primary.main',
                      mb: 2
                    }}
                  >
                    Table des matières
                  </Typography>
                  <TableOfContents />
                </Paper>
              </Grid>
            )}

            <Grid item xs={12} md={9}>
              <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    align="center" 
                    sx={{ 
                      mb: 4,
                      color: 'primary.main',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
                    }}
                  >
                    Conditions Générales de Vente
                  </Typography>

                  <Box id="introduction" sx={{ mb: 6 }}>
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: 'text.primary',
                        textAlign: 'justify',
                        letterSpacing: '0.01em'
                      }}
                    >
                      Les présentes Conditions Générales de vente SMAB (ci-après les « CGV ») s'appliquent à toute commande de Produits effectuée par un Acheteur auprès sur le site SMAB (https://www.smab-co.com/). Les CGV applicables sont celles en vigueur au jour de la passation de la commande par l'Acheteur.
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  <Box id="produit" sx={{ mb: 6 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 3,
                      pb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.light'
                    }}>
                      <ShoppingCart sx={{ 
                        mr: 2, 
                        color: 'primary.main', 
                        fontSize: 32,
                        filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))'
                      }} />
                      <Typography 
                        variant="h4" 
                        component="h2" 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase',
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                        }}
                      >
                        PRODUIT
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ 
                      bgcolor: 'background.default', 
                      p: 2,
                      '&:hover': {
                        boxShadow: 2,
                        transition: 'box-shadow 0.3s ease-in-out'
                      }
                    }}>
                      <CardContent>
                        <Typography 
                          variant="body1" 
                          paragraph 
                          sx={{ 
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'text.primary',
                            textAlign: 'justify',
                            letterSpacing: '0.01em',
                            '& strong': {
                              fontWeight: 600,
                              color: 'primary.main'
                            }
                          }}
                        >
                          Sur notre site web, nous proposons une gamme variée des machines et équipements de qualité, destines aux secteurs agro Food, cosmétique et pharmaceutique. Ces produits peuvent être disponibles en stock ou sur commande.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          Chaque produit est accompagné d'une fiche détaillée décrivant ses caractéristiques et fonctionnalités, ainsi qu'une vidéo de démonstration pour visualiser son utilisation.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="prix" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Receipt sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        PRIX ET DEVIS
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          Le prix des machines et équipements ne sont pas affichés directement sur le site web. Ils sont communiqués uniquement sur demande de devis.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          Ce processus nous permet de proposer des tarifs adaptés à vos besoins spécifiques et au volume souhaité.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="commande" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <MenuBook sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        COMMANDE
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                          Comment passer une commande sur le site web ?
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText primary="1. Connectez-vous à votre compte client sur notre site web." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="2. Sélectionnez le produit que vous souhaitez acheter et ajoutez-le à votre panier." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="3. Une fois que votre panier prêt, valider la sélection en cliquant sur demander un devis." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="4. Votre demande sera automatiquement redirigée vers notre centre clientèle via WhatsApp, ou notre équipe vous contactera pour finaliser les détails de votre devis." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="5. Une fois le devis accepté, votre commande sera confirmée et un suivi vous sera fourni pour les étapes ultérieures." />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="paiement" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Payment sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        PAIEMENT
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="body1" paragraph>
                          Nous vous offrons la flexibilité de choisir entre deux méthodes de paiement :
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="1. Paiement en Ligne"
                              secondary="Vous pouvez effectuer le paiement en ligne en utilisant l'une des méthodes de paiement sécurisées que nous acceptons."
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="2. Paiement à la Livraison"
                              secondary="Si vous préférez ne pas effectuer de paiement en ligne, vous avez la possibilité de choisir le paiement à la livraison."
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="reservation" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Assignment sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        POLITIQUE DE RÉSERVATION
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          La politique de réservation définit les conditions de réservation des machines proposées par SMAB via son site web ou directement en magasin.
                        </Typography>
                        
                        <Typography variant="h5" component="h3" gutterBottom>
                          1. Modalités de réservation
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="Réservation possible :"
                              secondary={
                                <>
                                  - En ligne sur www.smab-co.com<br/>
                                  - Directement en magasin
                                </>
                              }
                            />
                          </ListItem>
                        </List>

                        <Typography variant="h5" component="h3" gutterBottom>
                          {`2. Paiement d'un acompte`}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {`Toute réservation nécessite un acompte de 30% du montant total de la commande. La réservation ne sera validée qu'après réception de cet acompte.`}
                        </Typography>

                        <Typography variant="h5" component="h3" gutterBottom>
                          3. Durée de validité
                        </Typography>
                        <Typography variant="body1" paragraph>
                         {` La réservation est valable pendant une période d'un mois à compter de la date de confirmation.`}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="livraison" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <LocalShipping sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        LIVRAISON
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                          Délais de livraison
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          Les délais de livraison peuvent varier entre 1 à 2 jours ouvrables.
                        </Typography>

                        <Typography variant="h5" component="h3" gutterBottom>
                          Coût de la livraison
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          Le coût de livraison peut varier en fonction de plusieurs facteurs tels que le lieu de livraison, le poids du colis et la rapidité de la livraison. Les frais de livraison sont calculés automatiquement en fonction des informations fournies lors de la commande.
                        </Typography>

                        <Typography variant="h5" component="h3" gutterBottom>
                          Gestion des commandes réacheminées
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText primary="• Notre société de livraison vous contactera pour organiser la livraison." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="• En cas d'injoignabilité, le livreur vous recontactera." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="• Après 3 tentatives sans réponse, la commande sera réacheminée vers nos entrepôts et annulée." />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="retractation" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <SwapHoriz sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        RÉTRACTATION
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          {`Conformément aux dispositions légales en vigueur, le Client dispose d'un délai de rétractation de sept (7) jours francs à compter du jour de réception de la commande.`}
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                         {` L'Acheteur peut retourner son produit, sans avoir à justifier de motifs ni à payer de pénalités, à l'exception des frais de retour qui restent à sa charge.`}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="garantie" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Security sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        GARANTIE
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          {`Nous offrons une garantie limitée de 12 mois sur les machines et équipements de « SMAB ». Si vous rencontrez un problème avec votre produit dans les 12 mois suivant la date d'achat, nous le réparerons gratuitement ou sinon nous fournirons un produit de remplacement.`}
                        </Typography>

                        <Typography variant="h5" component="h3" gutterBottom>
                          Pièces couvertes par la garantie
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText primary="1. La garantie couvre toutes les pièces du produit, cela signifie que si une pièce se brise ou ne fonctionne pas correctement, elle sera remplacée gratuitement." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="2. La garantie couvre la réparation nécessaire d'un produit défectueux. Cela signifie que si le produit nécessite une réparation, le travail sera effectué gratuitement." />
                          </ListItem>
                        </List>

                        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
                          Pièces non couvertes par la garantie
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText primary="1. La garantie ne couvre pas les dommages causés par une mauvaise utilisation, une utilisation abusive ou une négligence." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="2. Les dommages causés par une installation incorrecte ou par des réparations effectuées par des personnes non autorisées." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="3. La garantie couvre seulement et uniquement tout défaut de fabrication." />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="sav" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Build sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        SERVICE APRÈS-VENTE
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                          Comment bénéficier du service après-vente ?
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Nous mettons à votre disposition une assistance à distance pour vous guider dans la résolution des problèmes techniques ou des pannes de vos produits.
                        </Typography>

                        <Typography variant="h5" component="h3" gutterBottom>
                          Pièces de rechange
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Si votre produit nécessite le remplacement de certaines pièces d'usures, nous vous offrons la possibilité d'acheter les pièces de rechange nécessaires.
                        </Typography>

                        <Typography variant="h5" component="h3" gutterBottom>
                          Limitations du SAV
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="Assistance à distance limitée aux problèmes courants"
                              secondary="Pour les cas complexes, nous vous recommandons de faire appel à un professionnel partenaire qualifié."
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Exclusions"
                              secondary="Les dommages causés par une mauvaise utilisation, négligence ou modifications non autorisées ne sont pas couverts."
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="retour" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Restore sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        RETOURS ET REMBOURSEMENTS
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                          Conditions de retours et remboursements
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="1. Non ouverture du produit"
                              secondary="Les retours seront acceptés uniquement si le produit est retourné dans son emballage d'origine scellé et n'a pas été ouvert."
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="2. Défaut de fabrication"
                              secondary="Les retours seront autorisés si un défaut de fabrication est identifié par nos techniciens qualifiés."
                            />
                          </ListItem>
                        </List>

                        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
                          Délais et procédure
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText primary="• Les demandes doivent être soumises dans les 7 jours suivant la réception." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="• Une preuve d'achat valide est requise." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="• Les frais de retour sont à la charge du client." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="• Le remboursement sera effectué selon le mode de paiement initial." />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box id="contact" sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Help sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        NOUS CONTACTER
                      </Typography>
                    </Box>
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                      <CardContent>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                          {`Pour toute question ou assistance, n'hésitez pas à nous contacter :`}
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText primary="Email : contact@smab-co.com" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Téléphone : +212 766-074939" />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="WhatsApp"
                              secondary={<a href="https://wa.me/212766074939" target="_blank" rel="noopener noreferrer">Cliquez ici</a>}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CGV;
