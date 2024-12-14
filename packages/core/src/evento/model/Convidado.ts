export default interface Convidado {
  id: string;
  nome: string;
  email: string;
  confirmado: boolean;
  possuiAcompanhantes: boolean;
  qtdeAcompanhantes: number;
}
