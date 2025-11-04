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
    mgEvent: string;
    amarea: string;
    leonardi: string;
    rentabook: string;
    bosmans: string;
    bruxelles: string;
    fiftyone: string;
  };
  contact: {
    title: string;
  };
  games: {
    title: string;
    subtitle: string;
    bestScore: string;
    blackjack: {
      title: string;
      description: string;
      score: string;
      best: string;
      dealer: string;
      player: string;
      hit: string;
      stand: string;
      startGame: string;
      newGame: string;
      instructions: string;
      bust: string;
      dealerBust: string;
      dealerWins: string;
      playerWins: string;
      push: string;
      blackjack: string;
      dealerBlackjack: string;
    };
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
    admin: string;
    dashboard: string;
    manageProjects: string;
    logout: string;
  };
  admin: {
    dashboard: {
      title: string;
      overview: string;
      projects: string;
      analytics: string;
      totalVisitors: string;
      lastUpdated: string;
      analyticsTitle: string;
      analyticsDescription: string;
    };
  };
}