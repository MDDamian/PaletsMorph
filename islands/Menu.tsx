import { useState } from "preact/hooks";
import EmailValidator from "../components/EmailValidator.tsx";
import Counter from "./Counter.tsx";

export default function Menu() {
  const [selectedComponent, setSelectedComponent] = useState("none");

  return (
    <div>
      <h1>Menú de Opciones</h1>
      <nav>
        <button onClick={() => setSelectedComponent("email")}>Validar Correo</button>
        <button onClick={() => setSelectedComponent("counter")}>Contador</button>
      </nav>

      {/* Mostrar el componente seleccionado */}
      <div>
        {selectedComponent === "email" && <EmailValidator />}
        {selectedComponent === "counter" && <Counter />}
      </div>
    </div>
  );
}
