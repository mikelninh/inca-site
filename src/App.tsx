import Hero from './components/Hero'
import Nav from './components/Nav'
import Console from './components/console/Console'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Console />
      <section id="teardown" />
      <section id="grounding" />
      <section id="flotte" />
      <section id="fit" />
      <section id="cta" />
    </>
  )
}
