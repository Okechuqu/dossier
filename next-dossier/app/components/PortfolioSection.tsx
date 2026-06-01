import { client } from "../client";
import { PortableTextBlock } from "next-sanity";
import Portfolio from "./Portfolio";

const PORTFOLIO_QUERY = `*[
  _type == "portfolio"
] | order(_createdAt desc)`;
const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

export interface TitleDataDocument {
  portfolio_title: string;
  portfolio_title_span: string;
}

export interface PortfolioDataDocument {
  portfolio_stack: string[];
  portfolio_description: PortableTextBlock[];
  portfolio_link: string;
  portfolio_image?: Array<{ asset: { url: string } }>;
  portfolio_title: string;
}

const PortfolioSection = async () => {
  const [portfolioData, titleData] = await Promise.all([
    client.fetch<PortfolioDataDocument[]>(PORTFOLIO_QUERY, {}, options),
    client.fetch<TitleDataDocument>(TITLE_QUERY, {}, options),
  ]);

  if (!portfolioData || portfolioData.length === 0)
    return <div id="portfolio" className="w-full h-2" />;

  return <Portfolio portfolioData={portfolioData} titleData={titleData} />;
};

export default PortfolioSection;
