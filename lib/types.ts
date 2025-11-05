export type Language = 'en' | 'fr';

export interface Translation {
  nav: {
    home: string;
    skills: string;
    projects: string;
    about: string;
    contact: string;
    games: string;
  };
  hero: {
    iam: string;
    roles: string[];
  };
  about: {
    title: string;
    description: string[];
    keySkills: string;
    skills: {
      bilingual: string;
      responsive: string;
      frontend: string;
      backend: string;
      frameworks: string;
      problemSolving: string;
    };
  };
  skills: {
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      cms: string;
      tools: string;
    };
    technologies: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewCode: string;
    viewDemo: string;
    // individual project short descriptions (optional)
    mgEvent?: string;
    amarea?: string;
    leonardi?: string;
    rentabook?: string;
    bosmans?: string;
    bruxelles?: string;
    fiftyone?: string;
    // CTA for projects page
    cta?: {
      title?: string;
      subtitle?: string;
      button?: string;
    };
  };
  contact: {
    title: string;
    subtitle?: string;
    email: string;
    phone: string;
    social: string;
    form: {
      title: string;
      subtitle: string;
      name: string;
      namePlaceholder?: string;
      email: string;
      emailPlaceholder?: string;
      message: string;
      messagePlaceholder?: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  interests: {
    title: string;
    subtitle: string;
    gaming: {
      title: string;
      description: string;
      details: string[];
    };
    music: {
      title: string;
      description: string;
      details: string[];
    };
    cats: {
      title: string;
      description: string;
      details: string[];
    };
    social: {
      title: string;
      description: string;
      details: string[];
    };
  };
  games: {
    title: string;
    subtitle: string;
    memory: {
      title: string;
      description: string;
      moves: string;
      score: string;
      newGame: string;
    };
    snake: {
      title: string;
      description: string;
      score: string;
      best?: string;
      pause?: string;
      resume?: string;
      gameOver?: string;
      finalScore?: string;
      newGame?: string;
      startGame?: string;
      ready?: string;
      instructions?: string;
    };
    clicker: {
      title: string;
      description: string;
      points: string;
      best?: string;
      clickMe?: string;
      reset?: string;
      addPoints?: string;
    };
    blackjack: {
      title: string;
      description: string;
      score: string;
      best?: string;
      dealer?: string;
      player?: string;
      hit?: string;
      stand?: string;
      startGame?: string;
      newGame?: string;
      instructions?: string;
      bust?: string;
      dealerBust?: string;
      dealerWins?: string;
      playerWins?: string;
      push?: string;
      blackjack?: string;
      dealerBlackjack?: string;
    };
    bestScore?: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    totalVisitors: string;
    pageViews: string;
    averageTime: string;
    bounceRate: string;
    lastUpdated: string;
    today: string;
    perSession: string;
  };
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
}
