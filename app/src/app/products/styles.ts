import { fullWidthBoxStyle } from "../common/styles";

export const productsWrapperBoxStyle = {
  ...fullWidthBoxStyle,
  alignItems: "stretch",
  justifyContent: "flex-start",
  flexWrap: "wrap",
};

export const HomeContent = {
  display: "flex",
  flexDirection: "column" as 'column',
  alignItems: "center",
  justifyContent: "center",
}
export const Hero = {
  width: '100%',
  height: `calc(100vh - 85px)`,
  marginBottom: '50px',
  backgroundImage: "url('https://hips.hearstapps.com/hmg-prod/images/nikenews-sp20-bb-nike-adapt-bb-2-0-hero-iphone-watch-01-native-1600-1614183404.jpg?crop=1xw:0.75xh;center,top&resize=1200:*')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

export const HeroButton = {
  color: 'black',
  backgroundColor: 'white',
  fontFamily: 'Lato, sans-serif',
  fontSize: '25px',
  marginTop: '20px',
  marginLeft: '100px',
  padding: '10px',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
}

export const HeroButtonHover = {
  color: 'white',
  backgroundColor: 'black',
  fontFamily: 'Lato, sans-serif',
  fontSize: '25px',
  marginTop: '20px',
  marginLeft: '100px',
  padding: '10px',
  cursor: 'pointer',
  borderRadius: '10px',
  transition: 'background-color 0.3s ease'
}

export const Products = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '20px',
  width: '100%',
}

export const HomeProduct = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  margin: 'auto',
  backgroundColor: 'white',
  padding: '20px',
}

export const ProductName ={
  fontFamily: 'Lato, sans-serif',
  fontSize: '22px',
  fontWeight: 'bold',
  color: 'black',
}

export const ProductPrice = {
  fontFamily: 'Lato, sans-serif',
  fontSize: '20px',
  color: 'green',
  marginTop: '5px',
}

export const ProductDescription = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  position: 'relative' as 'relative',
}

export const ProductImage = {
  width: '100%',
  height: '300px',
  objectFit: 'contain' as 'contain',
}

export const Footer = {
  backgroundColor: 'black',
  display: 'flex',
  fontFamily: 'Lato, sans-serif',
  fontSize: '20px',
}

export const FooterText = {
  color: 'white',
  margin: 'auto',
  padding: '20px',
}

export const Header = {
  display: 'flex',
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 25px',
  fontFamily: 'Lato, sans-serif',
  fontSize: '20px',
  width: '100%',
}

export const LogButton = {
  color: 'white',
  backgroundColor: 'black',
  fontFamily: 'Lato, sans-serif',
  fontSize: '15px',
  padding: '10px',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
}

export const Logo = {
  width: '100px',
  height: '75px',
  objectFit: 'contain' as 'contain',
  cursor: 'pointer',
}

export const HeroSubtitle = {
  fontFamily: 'Lato, sans-serif',
  fontSize: '45px',
  color: 'white',
  marginLeft: '100px',
  marginBottom: '25px'
}

export const HeroText = {
  fontFamily: 'Lato, sans-serif',
  fontWeight: 'bold',
  fontSize: '75px',
  color: 'white',
  marginTop:'100px',
  marginLeft: '100px',
}

export const ProductsList = {
  padding: '20px',
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "20px",
}

export const ProductsContent = {
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  padding: '20px',
  backgroundColor: "white",
}