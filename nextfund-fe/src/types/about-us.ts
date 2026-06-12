export interface AboutHero {
  title: string;
  description: string;
}

export interface Mission {
  title: string;
  description: string;
}

export interface WhatWeDo {
  title: string;
  forInvestors: {
    title: string;
    items: string[];
  };
  forInvestees: {
    title: string;
    items: string[];
  };
  image: string;
}

export interface ApproachItem {
  id: string;
  title: string;
  description: string;
}

export interface MarketFocus {
  id: string;
  sector: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
}

export interface Leadership {
  title: string;
  description: string;
}

export interface Compliance {
  title: string;
  description: string;
}

export interface Contact {
  title: string;
  description: string;
  image: string;
}
