import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { MoviesEntity } from "./entities/movie.entity";
import { MoviesRepository } from "./movies.repository";
import { HttpsProxyAgent } from "https-proxy-agent";

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository
  ) {
  }

  private readonly logger = new Logger(MoviesService.name);
  private url = "https://apis.justwatch.com/graphql";
  private interval = 100;
  private deviceId = ["CwQaL8OCP03CqcKUCsKaXM", "w47DkXjDrsO7w6ZLCsKbNB", "WHrDlcOQwoDDhkdLCqpvfM", "CTXDnBjCisKcSsK8Co9Tc8", "w7cIwrYLwqBwRwfCCEPDoy", "w73DsBxOL0lCwpzCCsK7w7"];
  private deviceIdx = 0;
  private Number = 0;
  private proxyUrl = "http://mikheilpai8:Xf4bJUCMie9o9oYxVWs8@core-residential.evomi.com:1000";
  private agent = new HttpsProxyAgent(this.proxyUrl);
  private headers = {
    "device-id": this.deviceId[this.deviceIdx]
  };
  private offset = 0;
  private limit = 40;
  private number = 0;
  private requestCounter = 0;


  async getEachMovie(offset: number): Promise<MoviesEntity[]> {
    const movies = await this.moviesRepository.findBatch(offset, this.limit);
    return movies;
  }

  getPayload(type: string, movie: string) {
    return {
      "operationName": "GetUrlTitleDetails",
      "variables": {
        "platform": "WEB",
        "fullPath": `/us/${type}/${movie}`,
        "language": "en",
        "country": "US",
        // "episodeMaxLimit": 20,
        "allowSponsoredRecommendations": {
          "pageType": "VIEW_TITLE_DETAIL",
          "placement": "DETAIL_PAGE",
          "language": "en",
          "country": "US",
          "applicationContext": {
            "appID": "3.9.2-webapp#1eee141",
            "platform": "webapp",
            "version": "3.9.2",
            "build": "1eee141",
            "isTestBuild": false
          },
          "appId": "3.9.2-webapp#1eee141",
          "platform": "WEB",
          "supportedFormats": [
            "IMAGE",
            "VIDEO"
          ],
          "supportedObjectTypes": [
            "MOVIE",
            "SHOW",
            "GENERIC_TITLE_LIST",
            "SHOW_SEASON"
          ],
          "alwaysReturnBidID": true,
          "testingModeForceHoldoutGroup": false,
          "testingMode": false
        }
      },
      "query": "query GetUrlTitleDetails($fullPath: String!, $country: Country!, $language: Language!, $episodeMaxLimit: Int, $platform: Platform! = WEB, $allowSponsoredRecommendations: SponsoredRecommendationsInput, $format: ImageFormat, $backdropProfile: BackdropProfile, $streamingChartsFilter: StreamingChartsFilter) { urlV2(fullPath: $fullPath) { id metaDescription metaKeywords metaRobots metaTitle heading1 heading2 htmlContent node { ...TitleDetails __typename } __typename } } fragment TitleDetails on MovieOrShowOrSeason { id objectType objectId __typename plexPlayerOffers: offers( country: $country platform: $platform filter: {packages: [\"pxp\"]} ) { ...WatchNowOffer __typename } justwatchTVOffers: offers( country: $country platform: $platform filter: {packages: [\"jwt\"]} ) { ...WatchNowOffer __typename } maxOfferUpdatedAt(country: $country, platform: WEB) disneyOffersCount: offerCount( country: $country platform: $platform filter: {packages: [\"dnp\"]} ) starOffersCount: offerCount( country: $country platform: $platform filter: {packages: [\"srp\"]} ) offerCount(country: $country, platform: $platform) uniqueOfferCount: offerCount( country: $country platform: $platform filter: {bestOnly: true} ) offers(country: $country, platform: $platform) { ...TitleOffer __typename } watchNowOffer(country: $country, platform: $platform) { ...WatchNowOffer __typename } promotedBundles(country: $country, platform: $platform) { promotionUrl __typename } availableTo(country: $country, platform: $platform) { availableCountDown(country: $country) availableToDate package { id shortName __typename } __typename } fallBackClips: content(country: $country, language: \"en\") { clips { ...TrailerClips __typename } videobusterClips: clips(providers: [VIDEOBUSTER]) { ...TrailerClips __typename } dailymotionClips: clips(providers: [DAILYMOTION]) { ...TrailerClips __typename } __typename } content(country: $country, language: $language) { backdrops { backdropUrl __typename } fullBackdrops: backdrops(profile: S1920, format: JPG) { backdropUrl __typename } clips { ...TrailerClips __typename } videobusterClips: clips(providers: [VIDEOBUSTER]) { ...TrailerClips __typename } dailymotionClips: clips(providers: [DAILYMOTION]) { ...TrailerClips __typename } externalIds { imdbId __typename } fullPath posterUrl fullPosterUrl: posterUrl(profile: S718, format: JPG) runtime isReleased scoring { imdbScore imdbVotes tmdbPopularity tmdbScore jwRating tomatoMeter certifiedFresh __typename } shortDescription title originalReleaseYear originalReleaseDate upcomingReleases { releaseCountDown(country: $country) releaseDate releaseType label package { id packageId shortName clearName monetizationTypes icon(profile: S100) iconWide(profile: S160) hasRectangularIcon(country: $country, platform: WEB) planOffers(country: $country, platform: $platform) { retailPrice(language: $language) durationDays presentationType isTrial retailPriceValue currency __typename } __typename } __typename } genres { shortName translation(language: $language) __typename } subgenres { content(country: $country, language: $language) { shortName name __typename } __typename } ... on MovieOrShowOrSeasonContent { subgenres { content(country: $country, language: $language) { url: moviesUrl { fullPath __typename } __typename } __typename } __typename } ... on MovieOrShowContent { originalTitle ageCertification credits { role name characterName personId __typename } interactions { dislikelistAdditions likelistAdditions votesNumber __typename } productionCountries __typename } ... on SeasonContent { seasonNumber interactions { dislikelistAdditions likelistAdditions votesNumber __typename } __typename } __typename } popularityRank(country: $country) { rank trend trendDifference __typename } streamingCharts(country: $country, filter: $streamingChartsFilter) { edges { streamingChartInfo { rank trend trendDifference updatedAt daysInTop10 daysInTop100 daysInTop1000 daysInTop3 topRank __typename } __typename } __typename } likelistEntry { createdAt __typename } dislikelistEntry { createdAt __typename } ... on MovieOrShow { watchlistEntryV2 { createdAt __typename } customlistEntries { createdAt genericTitleList { id __typename } __typename } similarTitlesV2( country: $country allowSponsoredRecommendations: $allowSponsoredRecommendations ) { sponsoredAd { ...SponsoredAd __typename } __typename } __typename } ... on Movie { permanentAudiences seenlistEntry { createdAt __typename } __typename } ... on Show { permanentAudiences totalSeasonCount seenState(country: $country) { progress seenEpisodeCount __typename } tvShowTrackingEntry { createdAt __typename } offers(country: $country, platform: $platform) { ...TitleOffer __typename } seasons(sortDirection: DESC) { id objectId objectType totalEpisodeCount availableTo(country: $country, platform: $platform) { availableToDate availableCountDown(country: $country) package { id shortName __typename } __typename } offers( country: $country platform: $platform filter: {monetizationTypes: [BUY, RENT]} ) { package { clearName shortName __typename } monetizationType retailPrice(language: $language) retailPriceValue __typename } content(country: $country, language: $language) { posterUrl seasonNumber fullPath title upcomingReleases { releaseDate releaseCountDown(country: $country) __typename } isReleased originalReleaseYear __typename } show { __typename id objectId objectType watchlistEntryV2 { createdAt __typename } content(country: $country, language: $language) { title __typename } } fallBackClips: content(country: $country, language: \"en\") { clips { ...TrailerClips __typename } videobusterClips: clips(providers: [VIDEOBUSTER]) { ...TrailerClips __typename } dailymotionClips: clips(providers: [DAILYMOTION]) { ...TrailerClips __typename } __typename } __typename } recentEpisodes: episodes( sortDirection: DESC limit: 3 releasedInCountry: $country ) { ...Episode __typename } __typename } ... on Season { totalEpisodeCount episodes(limit: $episodeMaxLimit) { ...Episode __typename } show { __typename id objectId objectType totalSeasonCount customlistEntries { createdAt genericTitleList { id __typename } __typename } tvShowTrackingEntry { createdAt __typename } fallBackClips: content(country: $country, language: \"en\") { clips { ...TrailerClips __typename } videobusterClips: clips(providers: [VIDEOBUSTER]) { ...TrailerClips __typename } dailymotionClips: clips(providers: [DAILYMOTION]) { ...TrailerClips __typename } __typename } content(country: $country, language: $language) { title ageCertification fullPath genres { shortName __typename } credits { role name characterName personId __typename } productionCountries externalIds { imdbId __typename } upcomingReleases { releaseDate releaseType package { id shortName planOffers(country: $country, platform: $platform) { retailPrice(language: $language) durationDays presentationType isTrial retailPriceValue currency __typename } __typename } __typename } backdrops { backdropUrl __typename } posterUrl isReleased videobusterClips: clips(providers: [VIDEOBUSTER]) { ...TrailerClips __typename } dailymotionClips: clips(providers: [DAILYMOTION]) { ...TrailerClips __typename } __typename } seenState(country: $country) { progress __typename } watchlistEntryV2 { createdAt __typename } dislikelistEntry { createdAt __typename } likelistEntry { createdAt __typename } similarTitlesV2( country: $country allowSponsoredRecommendations: $allowSponsoredRecommendations ) { sponsoredAd { ...SponsoredAd __typename } __typename } } seenState(country: $country) { progress __typename } __typename } } fragment WatchNowOffer on Offer { id standardWebURL streamUrl package { id icon packageId clearName shortName technicalName iconWide(profile: S160) hasRectangularIcon(country: $country, platform: WEB) __typename } retailPrice(language: $language) retailPriceValue lastChangeRetailPriceValue currency presentationType monetizationType availableTo dateCreated __typename } fragment TitleOffer on Offer { id presentationType monetizationType retailPrice(language: $language) retailPriceValue currency lastChangeRetailPriceValue type package { id packageId clearName shortName technicalName icon(profile: S100) iconWide(profile: S160) planOffers(country: $country, platform: WEB) { title retailPrice(language: $language) isTrial durationDays retailPriceValue children { title retailPrice(language: $language) isTrial durationDays retailPriceValue __typename } __typename } __typename } standardWebURL streamUrl elementCount availableTo subtitleLanguages videoTechnology audioTechnology audioLanguages(language: $language) __typename } fragment TrailerClips on Clip { sourceUrl externalId provider name __typename } fragment SponsoredAd on SponsoredRecommendationAd { bidId holdoutGroup campaign { name backgroundImages { imageURL size __typename } countdownTimer creativeType disclaimerText externalTrackers { type data __typename } hideDetailPageButton hideImdbScore hideJwScore hideRatings hideContent posterOverride promotionalImageUrl promotionalVideo { url __typename } promotionalTitle promotionalText promotionalProviderLogo promotionalProviderWideLogo watchNowLabel watchNowOffer { ...WatchNowOffer __typename } nodeOverrides { nodeId promotionalImageUrl watchNowOffer { standardWebURL __typename } __typename } node { nodeId: id __typename ... on MovieOrShowOrSeason { content(country: $country, language: $language) { fullPath posterUrl title originalReleaseYear scoring { imdbScore jwRating __typename } genres { shortName translation(language: $language) __typename } externalIds { imdbId __typename } backdrops(format: $format, profile: $backdropProfile) { backdropUrl __typename } isReleased __typename } objectId objectType offers(country: $country, platform: $platform) { monetizationType presentationType package { id packageId __typename } id __typename } __typename } ... on MovieOrShow { watchlistEntryV2 { createdAt __typename } __typename } ... on Show { seenState(country: $country) { seenEpisodeCount __typename } __typename } ... on Season { content(country: $country, language: $language) { seasonNumber __typename } show { __typename id objectId objectType content(country: $country, language: $language) { originalTitle __typename } watchlistEntryV2 { createdAt __typename } } __typename } ... on GenericTitleList { followedlistEntry { createdAt name __typename } id type content(country: $country, language: $language) { name visibility __typename } titles(country: $country, first: 40) { totalCount edges { cursor node: nodeV2 { content(country: $country, language: $language) { fullPath posterUrl title originalReleaseYear scoring { imdbVotes imdbScore tomatoMeter certifiedFresh jwRating __typename } isReleased __typename } id objectId objectType __typename } __typename } __typename } __typename } } __typename } __typename } fragment Episode on Episode { id objectId objectType seenlistEntry { createdAt __typename } uniqueOfferCount: offerCount( country: $country platform: $platform filter: {bestOnly: true} ) flatrate: offers( country: $country platform: $platform filter: {monetizationTypes: [FLATRATE_AND_BUY, FLATRATE, ADS, CINEMA, FREE], bestOnly: true} ) { id package { id clearName packageId __typename } __typename } buy: offers( country: $country platform: $platform filter: {monetizationTypes: [BUY], bestOnly: true} ) { id package { id clearName packageId __typename } __typename } rent: offers( country: $country platform: $platform filter: {monetizationTypes: [RENT], bestOnly: true} ) { id package { id clearName packageId __typename } __typename } free: offers( country: $country platform: $platform filter: {monetizationTypes: [ADS, FREE], bestOnly: true} ) { id package { id clearName packageId __typename } __typename } fast: offers( country: $country platform: $platform filter: {monetizationTypes: [FAST], bestOnly: true} ) { id package { id clearName packageId __typename } __typename } content(country: $country, language: $language) { title shortDescription episodeNumber seasonNumber isReleased runtime upcomingReleases { releaseDate label package { id packageId __typename } __typename } __typename } __typename } "};
  }

  async getMovies(offset: number) {
    if (this.requestCounter < 33803473) {
      const movies = await this.getEachMovie(offset);


      movies.forEach((movie) => {
        movie.primaryTitle = movie.primaryTitle
          .replaceAll(" ", "-")
          .toLowerCase()
          .replace(/[':]/g, "");
      });

      for (let i = 0; i < 40; i++) {
        if (!(movies[i].parsed) || !(movies[i].notData)) {
          let attempt = 0;
          const maxAttempts = 3;
          let success = false;


          while (attempt < maxAttempts) {
            this.requestCounter++;
            try {
              let type = "movie";
              let modifiedMovieTitle = movies[i].primaryTitle;

              switch (attempt) {
                case 0:
                  modifiedMovieTitle = movies[i].primaryTitle;
                  break;
                case 1:
                  modifiedMovieTitle = `${movies[i].primaryTitle}-${movies[i].startYear}`;
                  break;
                case 2:
                  type = "tv-show";
                  modifiedMovieTitle = `${movies[i].primaryTitle}`;
                  break;
              }


              const payload = this.getPayload(type, modifiedMovieTitle);
              const r = await axios.post(this.url, payload, { headers: this.headers, httpsAgent: this.agent });
              console.log(r.data);

              if (!r.data.errors) {
                movies[i].jsonData = JSON.stringify(r.data);
                movies[i].parsed = true;
                await this.moviesRepository.save(movies[i]);
                success = true;
                console.log(`Success for ${movies[i].primaryTitle}`, movies[i].id, this.requestCounter);
              }
              console.log(`movieid:${movies[i].id}, counter: ${this.requestCounter} ${this.number} ${this.offset}`);
              if ((movies[i].id % 40 === 0) && (this.requestCounter % 10 === 0)) {
                this.number++;
                this.offset += 40;
              }
              attempt++;
            } catch (error) {
              console.error(`Request failed on attempt ${attempt + 1} for ${movies[i].primaryTitle}:`, this.number, this.offset, this.limit, "121212", error.message, "12121212");
              this.requestCounter--;
            }

            if (!success) {
              movies[i].notData = true;
            }
          }
        }
        console.log(`Total requests simulated: ${this.requestCounter}`);
      }
    }
  }

  // async startLoop() {
  //   setInterval(() => {
  //
  //     this.getMovies(this.offset);
  //
  //   }, 2000);
  // }
  //
  // delay(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  //
  // onModuleInit() {
  //   this.startLoop();
  //   console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  // }
}


let json = `{
  "data": {
    "node": {
      "id": "tm1334588",
      "__typename": "Movie",
      "offerCount": 40,
      "maxOfferUpdatedAt": "2025-01-20T10:44:35.475583Z",
      "flatrate": [
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjE4OTk6ZmxhdHJhdGU6NGs=",
          "presentationType": "_4K",
          "monetizationType": "FLATRATE",
          "retailPrice": null,
          "retailPriceValue": null,
          "currency": "USD",
          "lastChangeRetailPriceValue": null,
          "type": "STANDARD",
          "package": {
            "id": "cGF8MTg5OQ==",
            "packageId": 1899,
            "clearName": "Max",
            "shortName": "mxx",
            "technicalName": "max",
            "icon": "/icon/305458112/s100/max.{format}",
            "iconWide": "/icon_wide/322151667/s160/max.{format}",
            "planOffers": [
              {
                "title": "With Ads monthly",
                "retailPrice": "$9.99",
                "isTrial": false,
                "durationDays": 30,
                "retailPriceValue": 9.99,
                "children": [],
                "__typename": "PackagePlanOffer"
              },
              {
                "title": "Ad-Free monthly",
                "retailPrice": "$16.99",
                "isTrial": false,
                "durationDays": 30,
                "retailPriceValue": 16.98,
                "children": [],
                "__typename": "PackagePlanOffer"
              },
              {
                "title": "Ultimate Ad-Free monthly",
                "retailPrice": "$20.99",
                "isTrial": false,
                "durationDays": 30,
                "retailPriceValue": 20.99,
                "children": [],
                "__typename": "PackagePlanOffer"
              },
              {
                "title": "With Ads Annual",
                "retailPrice": "$99.99",
                "isTrial": false,
                "durationDays": 365,
                "retailPriceValue": 99.99,
                "children": [],
                "__typename": "PackagePlanOffer"
              },
              {
                "title": "Ad-Free annual",
                "retailPrice": "$169.99",
                "isTrial": false,
                "durationDays": 365,
                "retailPriceValue": 169.99,
                "children": [],
                "__typename": "PackagePlanOffer"
              },
              {
                "title": "Ultimate Ad-Free annual",
                "retailPrice": "$209.99",
                "isTrial": false,
                "durationDays": 365,
                "retailPriceValue": 209.99,
                "children": [],
                "__typename": "PackagePlanOffer"
              }
            ],
            "__typename": "Package"
          },
          "standardWebURL": "https://play.max.com/show/69f69c59-fc16-402d-a1ad-cf8ea698b0e5?utm_source=universal_search",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": "2026-06-06",
          "subtitleLanguages": [
            "es"
          ],
          "videoTechnology": [
            "DOLBY_VISION"
          ],
          "audioTechnology": [
            "DOLBY_ATMOS"
          ],
          "audioLanguages": [
            "en",
            "fr",
            "pl",
            "pt",
            "sk",
            "th",
            "cs",
            "es",
            "hu"
          ],
          "__typename": "Offer"
        }
      ],
      "buy": [
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjEwOmJ1eTo0aw==",
          "presentationType": "_4K",
          "monetizationType": "BUY",
          "retailPrice": "$19.99",
          "retailPriceValue": 19.98,
          "currency": "USD",
          "lastChangeRetailPriceValue": 9.99,
          "type": "STANDARD",
          "package": {
            "id": "cGF8MTA=",
            "packageId": 10,
            "clearName": "Amazon Video",
            "shortName": "amz",
            "technicalName": "amazon",
            "icon": "/icon/430993/s100/amazon.{format}",
            "iconWide": "/icon_wide/322150880/s160/amazon.{format}",
            "planOffers": [],
            "__typename": "Package"
          },
          "standardWebURL": "https://watch.amazon.com/detail?gti=amzn1.dv.gti.cce7f3be-5e37-4bf5-b4b0-fe07f8e026d5",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": null,
          "subtitleLanguages": [
            "fi",
            "fr",
            "ja",
            "nl",
            "pl",
            "de",
            "en",
            "pt",
            "sv",
            "es",
            "it"
          ],
          "videoTechnology": [
            ""
          ],
          "audioTechnology": [
            "_5_POINT_1"
          ],
          "audioLanguages": [
            "en",
            "ja",
            "pt",
            "de",
            "es",
            "fr",
            "ca",
            "it",
            "pl"
          ],
          "__typename": "Offer"
        },
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjI6YnV5OjRr",
          "presentationType": "_4K",
          "monetizationType": "BUY",
          "retailPrice": "$19.99",
          "retailPriceValue": 19.98,
          "currency": "USD",
          "lastChangeRetailPriceValue": 9.99,
          "type": "STANDARD",
          "package": {
            "id": "cGF8Mg==",
            "packageId": 2,
            "clearName": "Apple TV",
            "shortName": "itu",
            "technicalName": "itunes",
            "icon": "/icon/190848813/s100/itunes.{format}",
            "iconWide": "/icon_wide/322150876/s160/itunes.{format}",
            "planOffers": [],
            "__typename": "Package"
          },
          "standardWebURL": "https://tv.apple.com/us/movie/beetlejuice-beetlejuice/umc.cmc.ofteydymwxj0xvr6ue3gt6z2?at=1000l3V2&ct=app_tv&itscg=30200&itsct=justwatch_tv_12&playableId=tvs.sbd.9001%3A1758604055",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": null,
          "subtitleLanguages": [
            "cs",
            "el",
            "et",
            "fi",
            "fr",
            "he",
            "pt",
            "ru",
            "sv",
            "uk",
            "ar",
            "da",
            "es",
            "ja",
            "ko",
            "lt",
            "lv",
            "nl",
            "no",
            "pl",
            "sl",
            "tr",
            "bg",
            "hu",
            "sk",
            "th"
          ],
          "videoTechnology": [
            "DOLBY_VISION"
          ],
          "audioTechnology": [
            "DOLBY_ATMOS"
          ],
          "audioLanguages": [
            "en",
            "es",
            "fr"
          ],
          "__typename": "Offer"
        },
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjc6YnV5OjRr",
          "presentationType": "_4K",
          "monetizationType": "BUY",
          "retailPrice": "$19.99",
          "retailPriceValue": 19.98,
          "currency": "USD",
          "lastChangeRetailPriceValue": 9.99,
          "type": "STANDARD",
          "package": {
            "id": "cGF8Nw==",
            "packageId": 7,
            "clearName": "Fandango At Home",
            "shortName": "vdu",
            "technicalName": "vudu",
            "icon": "/icon/322380782/s100/vudu.{format}",
            "iconWide": "/icon_wide/322149958/s160/vudu.{format}",
            "planOffers": [],
            "__typename": "Package"
          },
          "standardWebURL": "https://athome.fandango.com/content/browse/details/Beetlejuice-Beetlejuice/3324624",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": null,
          "subtitleLanguages": [],
          "videoTechnology": [
            "DOLBY_VISION"
          ],
          "audioTechnology": [
            "DOLBY_ATMOS"
          ],
          "audioLanguages": [
            "en"
          ],
          "__typename": "Offer"
        },
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjY4OmJ1eTo0aw==",
          "presentationType": "_4K",
          "monetizationType": "BUY",
          "retailPrice": "$19.99",
          "retailPriceValue": 19.98,
          "currency": "USD",
          "lastChangeRetailPriceValue": 24.99,
          "type": "STANDARD",
          "package": {
            "id": "cGF8Njg=",
            "packageId": 68,
            "clearName": "Microsoft Store",
            "shortName": "msf",
            "technicalName": "microsoft",
            "icon": "/icon/820542/s100/microsoft.{format}",
            "iconWide": "/icon_wide/322150924/s160/microsoft.{format}",
            "planOffers": [],
            "__typename": "Package"
          },
          "standardWebURL": "https://www.microsoft.com/en-us/p/beetlejuice-beetlejuice/8d6kgwxx3ch8",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": null,
          "subtitleLanguages": [],
          "videoTechnology": [],
          "audioTechnology": [],
          "audioLanguages": [],
          "__typename": "Offer"
        }
      ],
      "rent": [
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjEwOnJlbnQ6NGs=",
          "presentationType": "_4K",
          "monetizationType": "RENT",
          "retailPrice": "$5.99",
          "retailPriceValue": 5.99,
          "currency": "USD",
          "lastChangeRetailPriceValue": 9.99,
          "type": "STANDARD",
          "package": {
            "id": "cGF8MTA=",
            "packageId": 10,
            "clearName": "Amazon Video",
            "shortName": "amz",
            "technicalName": "amazon",
            "icon": "/icon/430993/s100/amazon.{format}",
            "iconWide": "/icon_wide/322150880/s160/amazon.{format}",
            "planOffers": [],
            "__typename": "Package"
          },
          "standardWebURL": "https://watch.amazon.com/detail?gti=amzn1.dv.gti.cce7f3be-5e37-4bf5-b4b0-fe07f8e026d5",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": null,
          "subtitleLanguages": [
            "sv",
            "de",
            "es",
            "it",
            "ja",
            "pl",
            "pt",
            "en",
            "fi",
            "fr",
            "nl"
          ],
          "videoTechnology": [
            ""
          ],
          "audioTechnology": [
            "_5_POINT_1"
          ],
          "audioLanguages": [
            "en",
            "es",
            "fr",
            "it",
            "ja",
            "ca",
            "pt",
            "de",
            "pl"
          ],
          "__typename": "Offer"
        },
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjI6cmVudDo0aw==",
          "presentationType": "_4K",
          "monetizationType": "RENT",
          "retailPrice": "$5.99",
          "retailPriceValue": 5.99,
          "currency": "USD",
          "lastChangeRetailPriceValue": 9.99,
          "type": "STANDARD",
          "package": {
            "id": "cGF8Mg==",
            "packageId": 2,
            "clearName": "Apple TV",
            "shortName": "itu",
            "technicalName": "itunes",
            "icon": "/icon/190848813/s100/itunes.{format}",
            "iconWide": "/icon_wide/322150876/s160/itunes.{format}",
            "planOffers": [],
            "__typename": "Package"
          },
          "standardWebURL": "https://tv.apple.com/us/movie/beetlejuice-beetlejuice/umc.cmc.ofteydymwxj0xvr6ue3gt6z2?at=1000l3V2&ct=app_tv&itscg=30200&itsct=justwatch_tv_12&playableId=tvs.sbd.9001%3A1758604055",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": null,
          "subtitleLanguages": [
            "he",
            "hu",
            "no",
            "th",
            "cs",
            "da",
            "fi",
            "lv",
            "nl",
            "ru",
            "tr",
            "ar",
            "bg",
            "el",
            "pt",
            "sv",
            "uk",
            "es",
            "fr",
            "ja",
            "pl",
            "sk",
            "sl",
            "et",
            "ko",
            "lt"
          ],
          "videoTechnology": [
            "DOLBY_VISION"
          ],
          "audioTechnology": [
            "DOLBY_ATMOS"
          ],
          "audioLanguages": [
            "en",
            "es",
            "fr"
          ],
          "__typename": "Offer"
        },
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjc6cmVudDo0aw==",
          "presentationType": "_4K",
          "monetizationType": "RENT",
          "retailPrice": "$5.99",
          "retailPriceValue": 5.99,
          "currency": "USD",
          "lastChangeRetailPriceValue": 9.99,
          "type": "STANDARD",
          "package": {
            "id": "cGF8Nw==",
            "packageId": 7,
            "clearName": "Fandango At Home",
            "shortName": "vdu",
            "technicalName": "vudu",
            "icon": "/icon/322380782/s100/vudu.{format}",
            "iconWide": "/icon_wide/322149958/s160/vudu.{format}",
            "planOffers": [],
            "__typename": "Package"
          },
          "standardWebURL": "https://athome.fandango.com/content/browse/details/Beetlejuice-Beetlejuice/3324624",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": null,
          "subtitleLanguages": [],
          "videoTechnology": [
            "DOLBY_VISION"
          ],
          "audioTechnology": [
            "DOLBY_ATMOS"
          ],
          "audioLanguages": [
            "en"
          ],
          "__typename": "Offer"
        },
        {
          "id": "b2Z8dG0xMzM0NTg4OlVTOjY4OnJlbnQ6NGs=",
          "presentationType": "_4K",
          "monetizationType": "RENT",
          "retailPrice": "$5.99",
          "retailPriceValue": 5.99,
          "currency": "USD",
          "lastChangeRetailPriceValue": 9.99,
          "type": "STANDARD",
          "package": {
            "id": "cGF8Njg=",
            "packageId": 68,
            "clearName": "Microsoft Store",
            "shortName": "msf",
            "technicalName": "microsoft",
            "icon": "/icon/820542/s100/microsoft.{format}",
            "iconWide": "/icon_wide/322150924/s160/microsoft.{format}",
            "planOffers": [],
            "__typename": "Package"
          },
          "standardWebURL": "https://www.microsoft.com/en-us/p/beetlejuice-beetlejuice/8d6kgwxx3ch8",
          "streamUrl": null,
          "elementCount": 0,
          "availableTo": null,
          "subtitleLanguages": [],
          "videoTechnology": [],
          "audioTechnology": [],
          "audioLanguages": [],
          "__typename": "Offer"
        }
      ],
      "free": [],
      "fast": [],
      "bundles": [
        {
          "node": {
            "id": "YnV8MTA0Mg==",
            "clearName": "Hulu with Max",
            "icon": "/icon/306909089/s100/huluhbomax.{format}",
            "technicalName": "huluhbomax",
            "bundleId": 1042,
            "packages": [
              {
                "icon": "/icon/116305230/{profile}/hulu.{format}",
                "id": "cGF8MTU=",
                "clearName": "Hulu",
                "packageId": 15,
                "__typename": "Package"
              },
              {
                "icon": "/icon/305458112/{profile}/max.{format}",
                "id": "cGF8MTg5OQ==",
                "clearName": "Max",
                "packageId": 1899,
                "__typename": "Package"
              }
            ],
            "__typename": "Bundle"
          },
          "promotionUrl": "https://www.kmtrak.com/23H7P9/3HWS9F7/?uid=1344",
          "offer": {
            "id": "b2Z8dG0xMzM0NTg4OlVTOjE4OTk6ZmxhdHJhdGU6c2Q=",
            "presentationType": "SD",
            "monetizationType": "FLATRATE",
            "retailPrice": null,
            "retailPriceValue": null,
            "currency": "USD",
            "lastChangeRetailPriceValue": null,
            "type": "STANDARD",
            "package": {
              "id": "cGF8MTg5OQ==",
              "packageId": 1899,
              "clearName": "Max",
              "shortName": "mxx",
              "technicalName": "max",
              "icon": "/icon/305458112/s100/max.{format}",
              "iconWide": "/icon_wide/322151667/s160/max.{format}",
              "planOffers": [
                {
                  "title": "With Ads monthly",
                  "retailPrice": "$9.99",
                  "isTrial": false,
                  "durationDays": 30,
                  "retailPriceValue": 9.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "Ad-Free monthly",
                  "retailPrice": "$16.99",
                  "isTrial": false,
                  "durationDays": 30,
                  "retailPriceValue": 16.98,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "Ultimate Ad-Free monthly",
                  "retailPrice": "$20.99",
                  "isTrial": false,
                  "durationDays": 30,
                  "retailPriceValue": 20.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "With Ads Annual",
                  "retailPrice": "$99.99",
                  "isTrial": false,
                  "durationDays": 365,
                  "retailPriceValue": 99.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "Ad-Free annual",
                  "retailPrice": "$169.99",
                  "isTrial": false,
                  "durationDays": 365,
                  "retailPriceValue": 169.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "Ultimate Ad-Free annual",
                  "retailPrice": "$209.99",
                  "isTrial": false,
                  "durationDays": 365,
                  "retailPriceValue": 209.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                }
              ],
              "__typename": "Package"
            },
            "standardWebURL": "https://play.max.com/show/69f69c59-fc16-402d-a1ad-cf8ea698b0e5?utm_source=universal_search",
            "streamUrl": null,
            "elementCount": 0,
            "availableTo": "2026-06-06",
            "subtitleLanguages": [
              "es"
            ],
            "videoTechnology": [
              "DOLBY_VISION"
            ],
            "audioTechnology": [
              "DOLBY_ATMOS"
            ],
            "audioLanguages": [
              "en",
              "es",
              "pt",
              "cs",
              "fr",
              "hu",
              "pl",
              "sk",
              "th"
            ],
            "__typename": "Offer"
          },
          "__typename": "PromotedBundleEdge"
        },
        {
          "node": {
            "id": "YnV8MTA1Mw==",
            "clearName": "Disney+, Hulu, & Max",
            "icon": "/icon/319443422/s100/disneyplushulumax.{format}",
            "technicalName": "disneyplushulumax",
            "bundleId": 1053,
            "packages": [
              {
                "icon": "/icon/313118777/{profile}/disneyplus.{format}",
                "id": "cGF8MzM3",
                "clearName": "Disney Plus",
                "packageId": 337,
                "__typename": "Package"
              },
              {
                "icon": "/icon/116305230/{profile}/hulu.{format}",
                "id": "cGF8MTU=",
                "clearName": "Hulu",
                "packageId": 15,
                "__typename": "Package"
              },
              {
                "icon": "/icon/305458112/{profile}/max.{format}",
                "id": "cGF8MTg5OQ==",
                "clearName": "Max",
                "packageId": 1899,
                "__typename": "Package"
              }
            ],
            "__typename": "Bundle"
          },
          "promotionUrl": "https://disneyplus.bn5x.net/c/1206980/2103561/9358",
          "offer": {
            "id": "b2Z8dG0xMzM0NTg4OlVTOjE4OTk6ZmxhdHJhdGU6c2Q=",
            "presentationType": "SD",
            "monetizationType": "FLATRATE",
            "retailPrice": null,
            "retailPriceValue": null,
            "currency": "USD",
            "lastChangeRetailPriceValue": null,
            "type": "STANDARD",
            "package": {
              "id": "cGF8MTg5OQ==",
              "packageId": 1899,
              "clearName": "Max",
              "shortName": "mxx",
              "technicalName": "max",
              "icon": "/icon/305458112/s100/max.{format}",
              "iconWide": "/icon_wide/322151667/s160/max.{format}",
              "planOffers": [
                {
                  "title": "With Ads monthly",
                  "retailPrice": "$9.99",
                  "isTrial": false,
                  "durationDays": 30,
                  "retailPriceValue": 9.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "Ad-Free monthly",
                  "retailPrice": "$16.99",
                  "isTrial": false,
                  "durationDays": 30,
                  "retailPriceValue": 16.98,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "Ultimate Ad-Free monthly",
                  "retailPrice": "$20.99",
                  "isTrial": false,
                  "durationDays": 30,
                  "retailPriceValue": 20.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "With Ads Annual",
                  "retailPrice": "$99.99",
                  "isTrial": false,
                  "durationDays": 365,
                  "retailPriceValue": 99.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "Ad-Free annual",
                  "retailPrice": "$169.99",
                  "isTrial": false,
                  "durationDays": 365,
                  "retailPriceValue": 169.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                },
                {
                  "title": "Ultimate Ad-Free annual",
                  "retailPrice": "$209.99",
                  "isTrial": false,
                  "durationDays": 365,
                  "retailPriceValue": 209.99,
                  "children": [],
                  "__typename": "PackagePlanOffer"
                }
              ],
              "__typename": "Package"
            },
            "standardWebURL": "https://play.max.com/show/69f69c59-fc16-402d-a1ad-cf8ea698b0e5?utm_source=universal_search",
            "streamUrl": null,
            "elementCount": 0,
            "availableTo": "2026-06-06",
            "subtitleLanguages": [
              "es"
            ],
            "videoTechnology": [
              "DOLBY_VISION"
            ],
            "audioTechnology": [
              "DOLBY_ATMOS"
            ],
            "audioLanguages": [
              "en",
              "es",
              "pt",
              "cs",
              "fr",
              "hu",
              "pl",
              "sk",
              "th"
            ],
            "__typename": "Offer"
          },
          "__typename": "PromotedBundleEdge"
        }
      ],
      "__typename": "Movie"
    }
  }
}`

json = json.replace(/;/g, "");

// Parse the corrected JSON string
const jsonObj = JSON.parse(json);

console.dir(jsonObj, { depth: null });
