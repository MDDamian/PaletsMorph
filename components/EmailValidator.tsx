import { useState } from "preact/hooks";

export default function EmailValidator() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validarCorreo = (correo: string) => {
    // Expresión regular para validar el correo
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const esValido = validarCorreo(email);
    setIsValid(esValido);
  };

  return (
    <div>
      <h2>Validador de Correo Electrónico</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          placeholder="Ingresa tu correo"
          required
        />
        <button type="submit">Validar</button>
      </form>

      {isValid === true && <p style="color: green;">El correo es válido.</p>}
      {isValid === false && <p style="color: red;">El correo no es válido.</p>}
    </div>
  );
}
