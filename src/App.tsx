import Bruch from './components/Bruch'
import CtaFooter from './components/CtaFooter'
import Fit from './components/Fit'
import Fleet from './components/Fleet'
import Grounding from './components/Grounding'
import Hero from './components/Hero'
import Interstitial from './components/Interstitial'
import Nav from './components/Nav'
import Console from './components/console/Console'
import { LangProvider } from './i18n'

export default function App() {
  return (
    <LangProvider>
      <Nav />
      <Hero />
      <Console />
      <Interstitial />
      <Bruch />
      <Grounding />
      <Fleet />
      <Fit />
      <CtaFooter />
    </LangProvider>
  )
}
