cafe-idiomas-lp

## Privacidade e LGPD (2026-11-08)

- O site **não tem política própria**: a Política de Privacidade é única da escola (site + portal) e fica em `https://portal.escolacafeidiomas.com.br/privacidade`. Os links e os dados da escola estão em `src/legal.ts`, que espelha `portal/frontend/src/features/legal/schoolInfo.ts`. Se um mudar, o outro muda junto.
- **Rodapé:** traz links para a Política e os Termos, além de razão social, CNPJ e cidade (identificação exigida pelo Decreto 7.962/2013 para oferta online).
- **Formulário de contato:** tem um aviso logo abaixo do botão. Não é checkbox de consentimento, porque a base legal é "procedimentos preliminares a contrato" (LGPD, art. 7º, V), que dispensa aceite.
- **Guarda dos dados:** 12 meses para quem não se matricula. As mensagens chegam no Gmail da escola, e a secretaria precisa apagar o que passar disso.
- **Cookies:** o site não grava nenhum, por isso não há banner. ⚠️ Antes de adicionar Google Analytics, Meta Pixel ou similar é obrigatório colocar um banner com opt-in e atualizar a seção 6 da Política.
- **Depoimentos em vídeo:** cada aluno que aparece precisa ter autorização de uso de imagem assinada (pelo responsável, se for menor).
