import React from 'react';
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';
import {
  Business,
  Gavel,
  Assignment
} from '@mui/icons-material';

const MentionLegal = () => {
  return (
    <Box sx={{ 
      bgcolor: 'grey.50',
      minHeight: '100vh',
      pt: 4,
      pb: 8
    }}>
      <Container maxWidth="lg">
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
              Mentions Légales
            </Typography>

            {/* Introduction */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="body1" paragraph sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                letterSpacing: '0.01em',
                textAlign: 'justify'
              }}>
                Ce Site est édité par la société SOMABRI, Société au capital de 300,000.00 DH dirhams, dont le siège social est situé à 21, bd Lahcen Ou Idder 20000 Casablanca, et dont les informations légales sont les suivantes :
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Company Information */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                pb: 2,
                borderBottom: '2px solid',
                borderColor: 'primary.light'
              }}>
                <Business sx={{ 
                  mr: 2, 
                  color: 'primary.main', 
                  fontSize: 32,
                  filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))'
                }} />
                <Typography variant="h4" component="h2" sx={{ 
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                }}>
                  Identité
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
                  <List sx={{
                    '& .MuiListItem-root': {
                      py: 1.5,
                      px: 2
                    },
                    '& .MuiListItemText-primary': {
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: 'text.primary'
                    }
                  }}>
                    <ListItem>
                      <ListItemText primary="• Registre de Commerce : 31259" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Taxe Professionnelle : 33310350" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• IF : 1048301" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• CNSS : 1483304" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Téléphone : 0522312056" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• N° de déclaration à la CNDP : en cours de traitement" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Box>

            {/* Modifications des mentions légales */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                pb: 2,
                borderBottom: '2px solid',
                borderColor: 'primary.light'
              }}>
                <Assignment sx={{ 
                  mr: 2, 
                  color: 'primary.main', 
                  fontSize: 32,
                  filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))'
                }} />
                <Typography variant="h4" component="h2" sx={{ 
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                }}>
                  Modifications des mentions légales
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
                  <Typography variant="body1" paragraph sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    letterSpacing: '0.01em'
                  }}>
                    Les présentes mentions légales sont consultables en ligne sur le site. Elles sont susceptibles d'être modifiées sans autre formalité que la mise en ligne d'une nouvelle version modifiée, seule cette dernière version étant retenue.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Compétence juridictionnelle */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                pb: 2,
                borderBottom: '2px solid',
                borderColor: 'primary.light'
              }}>
                <Gavel sx={{ 
                  mr: 2, 
                  color: 'primary.main', 
                  fontSize: 32,
                  filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))'
                }} />
                <Typography variant="h4" component="h2" sx={{ 
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                }}>
                  Compétence juridictionnelle et loi applicable
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
                  <Typography variant="body1" paragraph sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    letterSpacing: '0.01em'
                  }}>
                    Tout litige portant sur l'interprétation ou l'exécution des présentes sera soumis à la compétence exclusive du Tribunal de Commerce de Casablanca, la loi marocaine étant applicable au fond et à la procédure.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default MentionLegal;
