import DrawerAppBar from './common/components/AppBar'
import { Box, Typography } from './common/components/materialUI'
import { contentBoxStyle, layoutBoxStyle } from './common/styles'
import styles from './page.module.css'

export default function Home() {
  return (
    <Box sx={layoutBoxStyle}>
        <Typography>HOME</Typography>
    </Box>
  )
}
