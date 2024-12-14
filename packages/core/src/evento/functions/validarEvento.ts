import Evento from "../model/Evento";

export default function validarEvento(evento: Partial<Evento>): string[] {
  const erros: string[] = [];

  if (!evento.alias) {
    erros.push("Alias é obrigatório");
  }

  if (!evento.nome) {
    erros.push("Nome é obrigatório");
  }

  if (!evento.descricao) {
    erros.push("Descrição é obrigatória");
  }

  if (!evento.data) {
    erros.push("Data é obrigatória");
  }

  if (!evento.local) {
    erros.push("Local é obrigatório");
  }

  if (!evento.publicoEsperado || evento.publicoEsperado < 1) {
    erros.push("Público esperado é obrigatório");
  }

  if (!evento.imagem) {
    erros.push("Imagem é obrigatória");
  }

  if (!evento.imagemBackground) {
    erros.push("Imagem de fundo é obrigatória");
  }

  return erros;
}
