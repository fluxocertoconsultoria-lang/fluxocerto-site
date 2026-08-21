/**
 * Conteúdo padrão do site (seed).
 *
 * Este objeto é a "fonte da verdade" da estrutura: o painel admin gera os
 * formulários automaticamente a partir dele. Para criar um campo novo, basta
 * adicioná-lo aqui — o admin passa a exibi-lo.
 *
 * Convenções lidas pelo editor do admin (src/admin/fieldMeta.js):
 *  - chaves com imagem/foto/logo/icone/bg/img viram seletor de imagem (upload R2)
 *  - chaves em `texto`, `paragrafos`, `resposta` viram textarea
 *  - arrays viram listas com adicionar / remover / reordenar
 */
export const defaultContent = {
  brand: {
    nome: 'Fluxo Certo Consultoria',
    logo: '/img/logo.png',
    logoAlt: 'Fluxo Certo Consultoria',
  },

  nav: {
    itens: [
      { label: 'Início', href: '/' },
      { label: 'Mentoria', href: '/mentoria' },
    ],
    ctaLabel: 'Entre em contato',
    ctaHref: 'https://wa.me/5511975578387',
  },

  contato: {
    email: 'grazielasouza@fluxocerto.com.br',
    whatsapp: '(11) 97557-8387',
    whatsappHref: 'https://wa.me/5511975578387',
    instagram: '@eugrazielasouza',
    instagramHref: 'https://www.instagram.com/eugrazielasouza',
  },

  home: {
    seoTitulo: 'Fluxo Certo Consultoria | Gestão financeira para hotelaria e pequenos negócios',
    seoDescricao:
      'Consultoria em organização, controle e estratégia financeira para pousadas, hotéis e pequenos negócios. Clareza numérica, decisões estratégicas e previsibilidade.',

    hero: {
      ativo: true,
      eyebrow: 'Graziela Souza',
      titulo: 'Clareza e Estratégia Financeira para',
      tituloDestaque: 'Pousadas, Hotéis e Pequenos Negócios',
      texto:
        'Organização e controle financeiro para empresas que desejam crescer com segurança. Na hotelaria ou em outros setores, ajudamos você a enxergar seus números com clareza, tomar decisões estratégicas e conquistar previsibilidade.',
      ctaLabel: 'Entre em contato',
      ctaHref: 'https://wa.me/5511975578387',
      imagem: '/img/hero.jpg',
      imagemAlt: 'Graziela Souza, consultora financeira',
    },

    clientes: {
      ativo: true,
      eyebrow: 'Clientes',
      titulo: 'Alguns de nossos clientes',
      texto: 'Conheça empresas que já alcançaram clareza e eficiência financeira com a Fluxo Certo.',
      logos: [
        { imagem: '/img/cliente-1.png', alt: 'Cliente 1' },
        { imagem: '/img/cliente-2.png', alt: 'Cliente 2' },
        { imagem: '/img/cliente-3.png', alt: 'Cliente 3' },
        { imagem: '/img/cliente-4.png', alt: 'Cliente 4' },
        { imagem: '/img/cliente-5.png', alt: 'Cliente 5' },
        { imagem: '/img/cliente-6.png', alt: 'Cliente 6' },
        { imagem: '/img/cliente-7.png', alt: 'Cliente 7' },
      ],
    },

    quemSomos: {
      ativo: true,
      eyebrow: 'Fluxo Certo – Gestão Financeira com Visão Estratégica de Dono',
      titulo: 'Quem Somos',
      paragrafos: [
        'A Fluxo Certo Soluções Financeiras é uma consultoria especializada em organização, controle e estratégia financeira para pousadas, hotéis e pequenos negócios.',
        'Fundada por Graziela Souza, contadora com especialização em Gestão Financeira e MBA em Controladoria e Finanças, a consultoria reúne mais de 22 anos de experiência, sendo 19 deles em uma grande rede multinacional de hotelaria.',
        'Essa vivência permite unir técnica, visão estratégica e prática real do dia a dia do empresário — ajudando gestores e empreendedores a tomarem decisões com base em dados, planejamento e consciência de gestão.',
      ],
      missaoTitulo: 'Missão',
      missaoTexto:
        'Levar clareza financeira, autonomia e segurança para empresários, através de uma consultoria prática, humanizada e guiada pela mentalidade de dono.',
      imagem: '/img/sobre.jpg',
      imagemAlt: 'Graziela Souza analisando indicadores financeiros',
      imagemDecorativa: '/img/quem-somos.jpg',
      imagemDecorativaAlt: 'Gráficos e análises financeiras',
      statNumero: '22+',
      statLabel: 'Anos de Experiência',
    },

    servicos: {
      ativo: true,
      eyebrow: 'Serviços',
      titulo: 'O Que Fazemos',
      subtitulo: 'Consultoria e Mentoria Financeira para Hotelaria e Pequenos Negócios',
      itens: [
        {
          iconeNome: 'dollar',
          destaque: false,
          titulo: 'Estruturação e controle do fluxo de caixa',
          texto:
            'Criamos um sistema simples, claro e profissional para acompanhar entradas e saídas, garantindo previsibilidade e segurança.',
        },
        {
          iconeNome: 'funnel',
          destaque: false,
          titulo: 'Organização de contas a pagar e a receber',
          texto:
            'Implantamos processos eficientes para que nenhum compromisso seja esquecido e todas as receitas sejam recebidas no prazo.',
        },
        {
          iconeNome: 'chart',
          destaque: true,
          titulo: 'Capacitação de empresários e equipes',
          texto:
            'Treinamos você e seu time para lidar com finanças de forma estratégica e eficiente — ideal para hotéis e pousadas com equipes operacionais.',
        },
        {
          iconeNome: 'frame',
          destaque: false,
          titulo: 'Acompanhamento prático com foco em autonomia',
          texto:
            'Caminhamos com você até que a gestão financeira seja feita internamente, com segurança e independência.',
        },
        {
          iconeNome: 'piggybank',
          destaque: false,
          titulo: 'Diagnóstico financeiro detalhado',
          texto:
            'Analisamos a real situação do seu negócio para identificar riscos, oportunidades e prioridades.',
        },
        {
          iconeNome: 'clipboard',
          destaque: false,
          titulo: 'Ferramentas acessíveis e aplicáveis à rotina',
          texto:
            'Utilizamos recursos simples, práticos e que realmente funcionam na realidade do empreendedor — sem complexidade desnecessária.',
        },
      ],
    },

    diferenciais: {
      ativo: true,
      eyebrow: 'Porque nos escolher',
      titulo: 'Nossos Diferenciais',
      texto:
        'Nosso trabalho gera impacto real ao unir experiência, clareza e prática voltada ao dia a dia do empresário.',
      itens: [
        {
          iconeNome: 'userCheck',
          destaque: false,
          titulo: 'Experiência Diferencial',
          texto:
            'Mais de duas décadas de atuação em grandes empresas e hotelaria, aplicadas na realidade de pequenos negócios.',
        },
        {
          iconeNome: 'globe',
          destaque: true,
          titulo: 'Processo Simplificado',
          texto: 'Atendimento humanizado, direto e prático.',
        },
        {
          iconeNome: 'users',
          destaque: false,
          titulo: 'Parceria',
          texto:
            'Atuação próxima ao empresário, com foco em consciência financeira e melhorias reais.',
        },
        {
          iconeNome: 'database',
          destaque: false,
          titulo: 'Estudo de caso',
          texto: 'Análise completa para tomada de decisão baseada em dados.',
        },
        {
          iconeNome: 'trendUp',
          destaque: false,
          titulo: 'Praticidade',
          texto: 'Ferramentas que funcionam na prática, no ritmo do empreendedor.',
        },
        {
          iconeNome: 'award',
          destaque: false,
          titulo: 'Boas Práticas',
          texto:
            'Mentalidade de dono aplicada a cada estratégia, garantindo segurança e sustentabilidade.',
        },
      ],
    },

    contatoSecao: {
      ativo: true,
      eyebrow: 'Fale com a gente',
      titulo: 'Entre em contato',
      cards: [
        {
          icone: '/img/icon-email.png',
          titulo: 'Solicite uma Proposta por e-mail',
          valor: 'grazielasouza@fluxocerto.com.br',
          href: 'mailto:grazielasouza@fluxocerto.com.br',
        },
        {
          icone: '/img/icon-whatsapp.png',
          titulo: 'Entre em contato pelo Whatsapp',
          valor: '(11) 97557-8387',
          href: 'https://wa.me/5511975578387',
        },
        {
          icone: '/img/icon-instagram.png',
          titulo: 'Acompanhe através do Instagram',
          valor: '@eugrazielasouza',
          href: 'https://www.instagram.com/eugrazielasouza',
        },
      ],
    },

    parceirosNegocio: {
      ativo: true,
      eyebrow: 'Parceiros',
      titulo: 'Soluções integradas para cuidar de toda a sua empresa',
      texto:
        'Além da organização e estratégia financeira, a Fluxo Certo conta com parceiros especializados para apoiar sua empresa em áreas essenciais, como tecnologia hoteleira, gestão tributária, desenvolvimento de lideranças e capacitação de equipes. Você encontra soluções complementares, conduzidas por profissionais experientes e conectadas às necessidades reais do seu negócio.',
      itens: [
        {
          imagem: '/img/inovai-imagem1.png',
          imagemAjuste: 'contain',
          imagemAlt: 'Atendimento automatizado por IA da InovaiHotel em conversa de WhatsApp',
          logo: '/img/inovai-logo-inovaihotel.png',
          logoAlt: 'InovaiHotel',
          corFundo: '#0b1622',
          corMarca: '#c9a35c',
          corTexto: '#f2ede3',
          corTextoSuave: '#b9c2cc',
          titulo: 'Tecnologia e Gestão Hoteleira com IA',
          empresa: 'InovaiHotel',
          descricao:
            'Ecossistema completo de gestão hoteleira com inteligência artificial: PMS, motor de reservas, channel manager, financeiro e marketing, com atendimento automatizado 24h para hotéis e pousadas venderem mais.',
          servicos: [
            'PMS — gestão completa da operação',
            'Motor de reservas diretas, sem comissão',
            'Channel Manager (Booking, Airbnb e mais)',
            'Financeiro com conciliação automática',
            'Atendimento 24h por IA no WhatsApp',
            'Marketing automatizado nas redes sociais',
          ],
          aviso:
            'Serviços de tecnologia prestados pela empresa parceira InovaiHotel (Wg Soluções Tecnológicas Ltda).',
          botaoLabel: 'Quero conhecer a InovaiHotel',
          botaoHref: 'https://inovaihotel.com/',
        },
        {
          imagem: '/img/case-1.jpg',
          imagemAjuste: 'cover',
          imagemAlt: 'Sidnei Araújo Advocacia Tributária',
          logo: '',
          logoAlt: 'Sidnei Araújo Advocacia Tributária',
          titulo: 'Direito e Estratégia Tributária',
          empresa: 'Sidnei Araújo Advocacia Tributária',
          descricao:
            'Soluções jurídicas para empresas que desejam pagar os tributos corretamente, reduzir riscos e se preparar para as mudanças da Reforma Tributária.',
          servicos: [
            'Consulta e planejamento tributário',
            'Recuperação de créditos tributários',
            'Adequação à Reforma Tributária',
            'Assessoria tributária mensal',
            'Negociação de dívidas e transação tributária',
            'Defesa em execuções fiscais',
            'Análise e revisão da CAPAG',
          ],
          aviso:
            'Serviços jurídicos prestados pelo escritório parceiro Sidnei Araújo Advocacia Tributária (OAB/SP 410.014). A atuação jurídica é de responsabilidade exclusiva do advogado.',
          botaoLabel: 'Quero uma análise tributária',
          botaoHref:
            'https://wa.me/5511975578387?text=Ol%C3%A1%2C%20Grazi!%20Conheci%20a%20parceria%20tribut%C3%A1ria%20pelo%20site%20da%20Fluxo%20Certo%20e%20gostaria%20de%20entender%20qual%20solu%C3%A7%C3%A3o%20%C3%A9%20indicada%20para%20minha%20empresa.',
        },
        {
          imagem: '/img/case-3.jpg',
          imagemAjuste: 'cover',
          imagemAlt: 'ALP Consultoria — Alexandre Preto',
          logo: '',
          logoAlt: 'ALP Consultoria',
          titulo: 'Liderança, Hotelaria e Desenvolvimento de Equipes',
          empresa: 'ALP Consultoria — Alexandre Preto',
          descricao:
            'Treinamentos personalizados para hotéis, pousadas e empresas que desejam desenvolver líderes, engajar equipes, melhorar o atendimento e aumentar seus resultados. Alexandre Preto possui mais de 25 anos de experiência em gestão hoteleira, com atuação em hospedagem, alimentos e bebidas, recursos humanos, administração e eventos.',
          servicos: [
            'Liderança de alta performance',
            'A Potência da Liderança Consciente',
            'Atendimento com excelência',
            'Upselling e aumento de receita',
            'Inteligência emocional',
            'Comunicação e feedback',
            'Trabalho em equipe',
            'Formação de multiplicadores',
            'Jogos empresariais e treinamentos operacionais',
          ],
          aviso: '',
          botaoLabel: 'Quero desenvolver minha equipe',
          botaoHref:
            'https://wa.me/5511975578387?text=Ol%C3%A1%2C%20Grazi!%20Conheci%20os%20treinamentos%20para%20l%C3%ADderes%20e%20equipes%20pelo%20site%20da%20Fluxo%20Certo%20e%20gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es.',
        },
      ],
      fechamentoTitulo: 'Uma solução completa para o crescimento da sua empresa',
      fechamentoTexto:
        'A Fluxo Certo identifica as necessidades do negócio, organiza as prioridades e conecta sua empresa aos especialistas adequados para cada etapa.',
      fechamentoBotaoLabel: 'Fale com a Fluxo Certo',
      fechamentoBotaoHref:
        'https://wa.me/5511975578387?text=Ol%C3%A1%2C%20Grazi!%20Vim%20pelo%20site%20da%20Fluxo%20Certo%20e%20gostaria%20de%20conversar%20sobre%20a%20minha%20empresa.',
    },

    depoimentos: {
      ativo: true,
      eyebrow: 'Depoimentos',
      titulo: 'Depoimentos',
      texto:
        'Veja o que dizem nossos clientes, parceiros e amigos dessa longa estrada de sucesso.',
      imagem: '/img/hero.jpg',
      imagemAlt: 'Graziela Souza em atendimento',
      itens: [
        {
          texto:
            'Foi uma grande virada de chave. A Graziela trouxe uma experiência de controladoria com a gestão financeira para hotel de outro nível. Nosso Hotel tem o antes e depois da consultoria.',
          nome: 'Ana Julia',
          cargo: 'Cliente',
          foto: '/img/depoimento-ana.png',
        },
      ],
    },

    faq: {
      ativo: true,
      eyebrow: 'FAQs',
      titulo: 'Perguntas Frequentes',
      texto:
        'Aqui você encontra respostas para as dúvidas mais comuns sobre nossos serviços de consultoria e mentoria financeira. Informações claras e objetivas para ajudar você a entender como podemos transformar a gestão do seu negócio.',
      ctaLabel: 'Contato',
      ctaHref: 'https://wa.me/5511975578387',
      itens: [
        {
          pergunta: 'Como funciona a consultoria e mentoria financeira da Fluxo Certo?',
          resposta:
            'Iniciamos com um diagnóstico financeiro detalhado, identificando pontos de melhoria. Em seguida, aplicamos um plano personalizado que inclui organização do fluxo de caixa, processos de contas e acompanhamento contínuo, garantindo que sua empresa tenha autonomia na gestão.',
        },
        {
          pergunta: 'Quais tipos de empresas podem se beneficiar dos serviços da Fluxo Certo?',
          resposta:
            'Atendemos micro e pequenas empresas, negócios em fase de crescimento ou reestruturação e empreendedores que buscam clareza sobre entradas, saídas e lucros.',
        },
        {
          pergunta: 'A consultoria é presencial ou pode ser realizada online?',
          resposta:
            'O atendimento é feito de forma online, com encontros ao vivo, e também presencialmente quando a operação exige acompanhamento no local.',
        },
        {
          pergunta: 'Quais ferramentas são utilizadas para organizar as finanças da minha empresa?',
          resposta:
            'Utilizamos planilhas, sistemas simples e métodos de gestão financeira adaptados à realidade de cada negócio, sempre priorizando praticidade e eficiência.',
        },
        {
          pergunta: 'Em quanto tempo é possível ver resultados na organização financeira?',
          resposta:
            'Os primeiros resultados costumam aparecer já nos primeiros meses, especialmente na clareza sobre o fluxo de caixa e no controle de contas. O tempo total depende do envolvimento do empresário e da complexidade do negócio.',
        },
      ],
    },
  },

  mentoria: {
    seoTitulo: 'Mentoria Do Caos ao Lucro | Fluxo Certo',
    seoDescricao:
      'Descubra em 2 horas se o seu hotel realmente tem lucro. Mentoria Do Caos ao Lucro, com diagnóstico financeiro, fluxo de caixa com DRE e plano de ação.',

    hero: {
      ativo: true,
      eyebrow: 'Do Caos ao Lucro',
      titulo: 'Hotel cheio e caixa apertado?',
      subtitulo:
        'Descubra em apenas 2 horas se o seu hotel realmente tem lucro ou se está apenas pagando contas e trabalhando no prejuízo.',
      texto:
        'Mesmo que você odeie números, a Mentoria Do Caos ao Lucro mostra exatamente onde o dinheiro entra, onde vaza e o que precisa ser corrigido agora para ter previsibilidade financeira o ano todo.',
      ctaLabel: 'Quero aplicar para a mentoria',
      ctaHref: '#aplicacao',
      imagem: '/img/mentoria-hero.webp',
      imagemAlt: 'Mentoria Do Caos ao Lucro',
    },

    problema: {
      ativo: true,
      titulo: 'Você trabalha todos os dias.',
      texto:
        'Mas, no fim do mês, o dinheiro não sobra. O caixa vive apertado. As decisões são tomadas no achismo. A pergunta silenciosa aparece: “Será que meu hotel realmente dá lucro?” Muitos hotéis funcionam bem na operação, mas mal no financeiro. E sem clareza financeira, até hotel cheio pode quebrar.',
      citacao:
        'Um review publicado no Journal of Risk and Financial Management analisa estudos que investigam os fatores financeiros ligados a default (falência) no setor hoteleiro, destacando que aspectos como dívida, baixa rentabilidade e má gestão do dinheiro aumentam substancialmente o risco de falência nesses negócios. Isso mostra que a saúde financeira é um determinante importante para a sobrevivência das empresas hoteleiras.',
      fecho:
        'Ao participar da Mentoria Do Caos ao Lucro, você vai descobrir exatamente o que está travando o lucro do seu hotel e o que precisa ser corrigido imediatamente para parar de perder dinheiro.',
    },

    sobreMentoria: {
      ativo: true,
      texto:
        'A Mentoria Do Caos ao Lucro foi criada para donos de hotéis e pousadas que precisam entender seus números sem complicação, tomar decisões com segurança e transformar faturamento em lucro real, com acompanhamento ao vivo e método prático.',
      texto2:
        'Aqui você não recebe teoria, planilha solta ou conteúdo genérico. Você sai sabendo o que fazer, onde agir e como corrigir.',
    },

    paraQuem: {
      ativo: true,
      titulo: 'Para quem é essa mentoria?',
      subtitulo: 'Hoteleiros que:',
      itens: [
        { texto: 'Têm movimento, mas não sabem se realmente lucram' },
        { texto: 'Vivem com o caixa apertado' },
        { texto: 'Misturam contas pessoais e empresariais' },
        { texto: 'Precisam decidir sobre investimentos, contratações ou expansão' },
      ],
      naoE: 'Não é para quem quer apenas “olhar planilhas”.',
      sim: 'É para quem quer resultado, decisão e previsibilidade.',
    },

    entregas: {
      ativo: true,
      titulo: 'O que você vai receber nesta mentoria?',
      itens: [
        { titulo: 'Diagnóstico financeiro completo do seu hotel', texto: '' },
        { titulo: 'Implantação do fluxo de caixa com DRE integrada', texto: '' },
        { titulo: 'Plano de ação prático e aplicável, focado em correção imediata', texto: '' },
        { titulo: 'Acompanhamento ao vivo, com orientação direta', texto: '' },
      ],
      rodape: 'Tudo aplicado à realidade da sua operação, não a um modelo genérico.',
    },

    direcionamento: {
      ativo: true,
      titulo: 'Você precisa de um direcionamento para ter resultados diferentes',
      paragrafos: [
        'Seu negócio está enfrentando dificuldades para crescer? Você trabalha demais, mas nunca sabe quanto realmente sobra ao final do mês? Percebe que seu negócio tem potencial, mas não sabe como organizar o financeiro para avançar?',
        'Enquanto você se perde nas demandas da operação, tentar organizar o financeiro sozinho torna tudo mais difícil e demorado. Você até pode conseguir, mas o percurso será mais longo, cansativo e, muitas vezes, caro.',
        'Por outro lado, estar ao lado de uma especialista em finanças hoteleiras, que entende exatamente os desafios do setor, é como ter um mapa claro, com caminhos já testados e estratégias que funcionam.',
        'E o melhor: sem desperdiçar tempo, sem complicações e com acompanhamento ao vivo.',
      ],
    },

    tipos: {
      ativo: true,
      titulo: 'Será que a mentoria vai ajudar o meu tipo de hotel?',
      subtitulo:
        'A metodologia Fluxo Certo foi criada com base na rotina real da hotelaria e pode ser aplicada em:',
      itens: [
        { imagem: '/img/mentoria-tipo-1.webp', titulo: 'Pousadas' },
        { imagem: '/img/mentoria-tipo-2.webp', titulo: 'Hotéis independentes' },
        { imagem: '/img/mentoria-tipo-3.webp', titulo: 'Hotéis boutique' },
        { imagem: '/img/mentoria-tipo-4.webp', titulo: 'Hostels' },
        { imagem: '/img/mentoria-tipo-5.webp', titulo: 'Chalés e complexos de hospedagem' },
        { imagem: '/img/mentoria-tipo-6.webp', titulo: 'Empreendimentos híbridos com A&B' },
      ],
      rodape:
        'Nosso trabalho é identificar, com precisão, o que está travando o crescimento ou gerando prejuízo e mostrar como resolver.',
      aviso:
        'Importante: Para participar, é necessário que seu hotel esteja em operação há pelo menos 1 ano.',
    },

    resultados: {
      ativo: true,
      titulo: 'Quem já aplicou nossa metodologia sabe: os resultados são rápidos e consistentes',
      destaque: 'Mais de R$ 1.000.000 recuperados em diferentes operações hoteleiras.',
      texto: 'Redução de perdas, clareza financeira e decisões seguras.',
    },

    depoimentos: {
      ativo: true,
      titulo: 'Quem já aplicou nossa metodologia sabe:',
      itens: [
        {
          texto:
            'A mentoria trouxe clareza imediata. Em duas horas entendi para onde o dinheiro estava indo e o que precisava mudar na operação.',
          nome: 'Cliente Fluxo Certo',
          cargo: 'Pousada',
          foto: '/img/mentoria-depo-1.jpg',
        },
        {
          texto:
            'Saí com um plano de ação real, não com teoria. O fluxo de caixa com DRE mudou a forma como decidimos investimentos.',
          nome: 'Cliente Fluxo Certo',
          cargo: 'Hotel independente',
          foto: '/img/mentoria-depo-3.jpg',
        },
        {
          texto:
            'Depois do diagnóstico, cortamos perdas que nem sabíamos que existiam. Hoje o caixa é previsível.',
          nome: 'Cliente Fluxo Certo',
          cargo: 'Hostel',
          foto: '/img/mentoria-depo-2.jpg',
        },
      ],
    },

    sobreGrazi: {
      ativo: true,
      titulo: 'Quem é Grazi Souza?',
      paragrafos: [
        'Mentora e consultora financeira especializada em hotelaria. Formada em Gestão Financeira, contadora, com MBA em Controladoria e Finanças.',
        'São mais de 19 anos de experiência em grandes operações hoteleiras, com visão 360° do financeiro e da operação.',
        'Criadora do método Do Caos ao Lucro, desenvolvido a partir da vivência real da hotelaria — não da teoria.',
        'Aqui você não fala com uma contadora tradicional. Você fala com alguém que viveu o problema e sabe resolver.',
      ],
      imagem: '/img/grazi.png',
      imagemAlt: 'Grazi Souza',
    },

    aplicacao: {
      ativo: true,
      titulo: 'A mentoria é para aplicação prática.',
      subtitulo:
        'Aplique para entender a real situação financeira do seu hotel e decidir com segurança os próximos passos.',
      rodape:
        'Após finalizar o cadastro, um membro da equipe entrará em contato para te explicar todos os detalhes.',
      botao: 'FINALIZAR CADASTRO',
      mensagemSucesso:
        'Cadastro recebido! Em breve nossa equipe entra em contato pelo WhatsApp.',
      campos: {
        nome: 'Digite seu nome e sobrenome...',
        email: 'Digite seu melhor e-mail...',
        whatsapp: 'Digite seu DDD + WhatsApp...',
        instagram: 'Digite seu Instagram...',
      },
    },
  },

  rodape: {
    texto: 'Copyright © Fluxo Certo Consultoria',
    descricao:
      'Consultoria em organização, controle e estratégia financeira para pousadas, hotéis e pequenos negócios.',
    linksTitulo: 'Navegação',
    links: [
      { label: 'Início', href: '/' },
      { label: 'Mentoria', href: '/mentoria' },
    ],
  },
}

export default defaultContent
