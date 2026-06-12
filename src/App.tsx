import Hero from './components/Hero'
import Nav from './components/Nav'
import Console from './components/console/Console'
import Teardown from './components/Teardown'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Console />
      <Teardown />
      <section id="grounding" />
      <section id="flotte" />
      <section id="fit" />
      <section id="cta" />
    </>
  )
}
