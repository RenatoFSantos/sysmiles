import Convidado from "../model/Convidado";

export default function validarConvidado(
  convidado: Partial<Convidado>
): string[] {
  const erros: string[] = [];

  if (!convidado.nome) {
    erros.push("Nome é obrigatório");
  }

  if (!convidado.email) {
    erros.push("E-mail é obrigatório");
  }

  return erros;
}
