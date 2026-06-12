import CtaFooter from './components/CtaFooter'
import Fit from './components/Fit'
import Fleet from './components/Fleet'
import Grounding from './components/Grounding'
import Hero from './components/Hero'
import Loop from './components/Loop'
import Nav from './components/Nav'
import Teardown from './components/Teardown'
import Werkstatt from './components/Werkstatt'
import Console from './components/console/Console'
import { LangProvider } from './i18n'

export default function App() {
  return (
    <LangProvider>
      <Nav />
      <Hero />
      <Loop />
      <Console />
      <Teardown />
      <Werkstatt />
      <Grounding />
      <Fleet />
      <Fit />
      <CtaFooter />
    </LangProvider>
  )
}
