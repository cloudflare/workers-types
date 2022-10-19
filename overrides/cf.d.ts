// TODO: add Response cf object too

declare class Request extends Body {
  readonly cf?: IncomingRequestCfProperties;
}

interface RequestInit {
  /**
   * cf is a union of these two types because there are multiple
   * scenarios in which it might be one or the other.
   *
   * IncomingRequestCfProperties is required to allow
   *   new Request(someUrl, event.request)
   *
   * RequestInitCfProperties is required to allow
   *   new Request(event.request, {cf: { ... } })
   *   fetch(someUrl, {cf: { ... } })
   */
  cf?: IncomingRequestCfProperties | RequestInitCfProperties;
}

interface CfRequestInit extends Omit<RequestInit, "cf"> {
  cf?: RequestInitCfProperties;
}

/**
 * Back compat support with older types.
 * @deprecated Use CfRequestInit instead.
 */
type CfRequestInitializerDict = CfRequestInit;

interface BasicImageTransformations {
  /**
   * Maximum width in image pixels. The value must be an integer.
   */
  width?: number;
  /**
   * Maximum height in image pixels. The value must be an integer.
   */
  height?: number;
  /**
   * Resizing mode as a string. It affects interpretation of width and height
   * options:
   *  - scale-down: Similar to contain, but the image is never enlarged. If
   *    the image is larger than given width or height, it will be resized.
   *    Otherwise its original size will be kept.
   *  - contain: Resizes to maximum size that fits within the given width and
   *    height. If only a single dimension is given (e.g. only width), the
   *    image will be shrunk or enlarged to exactly match that dimension.
   *    Aspect ratio is always preserved.
   *  - cover: Resizes (shrinks or enlarges) to fill the entire area of width
   *    and height. If the image has an aspect ratio different from the ratio
   *    of width and height, it will be cropped to fit.
   *  - crop: The image will be shrunk and cropped to fit within the area
   *    specified by width and height. The image will not be enlarged. For images
   *    smaller than the given dimensions it's the same as scale-down. For
   *    images larger than the given dimensions, it's the same as cover.
   *    See also trim.
   *  - pad: Resizes to the maximum size that fits within the given width and
   *    height, and then fills the remaining area with a background color
   *    (white by default). Use of this mode is not recommended, as the same
   *    effect can be more efficiently achieved with the contain mode and the
   *    CSS object-fit: contain property.
   */
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
  /**
   * When cropping with fit: "cover", this defines the side or point that should
   * be left uncropped. The value is either a string
   * "left", "right", "top", "bottom", "auto", or "center" (the default),
   * or an object {x, y} containing focal point coordinates in the original
   * image expressed as fractions ranging from 0.0 (top or left) to 1.0
   * (bottom or right), 0.5 being the center. {fit: "cover", gravity: "top"} will
   * crop bottom or left and right sides as necessary, but won’t crop anything
   * from the top. {fit: "cover", gravity: {x:0.5, y:0.2}} will crop each side to
   * preserve as much as possible around a point at 20% of the height of the
   * source image.
   */
  gravity?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center"
    | "auto"
    | BasicImageTransformationsGravityCoordinates;
  /**
   * Background color to add underneath the image. Applies only to images with
   * transparency (such as PNG). Accepts any CSS color (#RRGGBB, rgba(…),
   * hsl(…), etc.)
   */
  background?: string;
  /**
   * Number of degrees (90, 180, 270) to rotate the image by. width and height
   * options refer to axes after rotation.
   */
  rotate?: 0 | 90 | 180 | 270 | 360;
}

interface BasicImageTransformationsGravityCoordinates {
  x: number;
  y: number;
}

/**
 * In addition to the properties you can set in the RequestInit dict
 * that you pass as an argument to the Request constructor, you can
 * set certain properties of a `cf` object to control how Cloudflare
 * features are applied to that new Request.
 *
 * Note: Currently, these properties cannot be tested in the
 * playground.
 */
interface RequestInitCfProperties {
  cacheEverything?: boolean;
  /**
   * A request's cache key is what determines if two requests are
   * "the same" for caching purposes. If a request has the same cache key
   * as some previous request, then we can serve the same cached response for
   * both. (e.g. 'some-key')
   *
   * Only available for Enterprise customers.
   */
  cacheKey?: string;
  /**
   * This allows you to append additional Cache-Tag response headers
   * to the origin response without modifications to the origin server.
   * This will allow for greater control over the Purge by Cache Tag feature
   * utilizing changes only in the Workers process.
   *
   * Only available for Enterprise customers.
   */
  cacheTags?: string[];
  /**
   * Force response to be cached for a given number of seconds. (e.g. 300)
   */
  cacheTtl?: number;
  /**
   * Force response to be cached for a given number of seconds based on the Origin status code.
   * (e.g. { '200-299': 86400, '404': 1, '500-599': 0 })
   */
  cacheTtlByStatus?: Record<string, number>;
  scrapeShield?: boolean;
  apps?: boolean;
  image?: RequestInitCfPropertiesImage;
  minify?: RequestInitCfPropertiesImageMinify;
  mirage?: boolean;
  polish?: "lossy" | "lossless" | "off";
  /**
   * Redirects the request to an alternate origin server. You can use this,
   * for example, to implement load balancing across several origins.
   * (e.g.us-east.example.com)
   *
   * Note - For security reasons, the hostname set in resolveOverride must
   * be proxied on the same Cloudflare zone of the incoming request.
   * Otherwise, the setting is ignored. CNAME hosts are allowed, so to
   * resolve to a host under a different domain or a DNS only domain first
   * declare a CNAME record within your own zone’s DNS mapping to the
   * external hostname, set proxy on Cloudflare, then set resolveOverride
   * to point to that CNAME record.
   */
  resolveOverride?: string;
}

interface RequestInitCfPropertiesImageDraw extends BasicImageTransformations {
  /**
   * Absolute URL of the image file to use for the drawing. It can be any of
   * the supported file formats. For drawing of watermarks or non-rectangular
   * overlays we recommend using PNG or WebP images.
   */
  url: string;
  /**
   * Floating-point number between 0 (transparent) and 1 (opaque).
   * For example, opacity: 0.5 makes overlay semitransparent.
   */
  opacity?: number;
  /**
   * - If set to true, the overlay image will be tiled to cover the entire
   *   area. This is useful for stock-photo-like watermarks.
   * - If set to "x", the overlay image will be tiled horizontally only
   *   (form a line).
   * - If set to "y", the overlay image will be tiled vertically only
   *   (form a line).
   */
  repeat?: true | "x" | "y";
  /**
   * Position of the overlay image relative to a given edge. Each property is
   * an offset in pixels. 0 aligns exactly to the edge. For example, left: 10
   * positions left side of the overlay 10 pixels from the left edge of the
   * image it's drawn over. bottom: 0 aligns bottom of the overlay with bottom
   * of the background image.
   *
   * Setting both left & right, or both top & bottom is an error.
   *
   * If no position is specified, the image will be centered.
   */
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface RequestInitCfPropertiesImage extends BasicImageTransformations {
  /**
   * Device Pixel Ratio. Default 1. Multiplier for width/height that makes it
   * easier to specify higher-DPI sizes in <img srcset>.
   */
  dpr?: number;
  /**
   * An object with four properties {left, top, right, bottom} that specify
   * a number of pixels to cut off on each side. Allows removal of borders
   * or cutting out a specific fragment of an image. Trimming is performed
   * before resizing or rotation. Takes dpr into account.
   */
  trim?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
  /**
   * Quality setting from 1-100 (useful values are in 60-90 range). Lower values
   * make images look worse, but load faster. The default is 85. It applies only
   * to JPEG and WebP images. It doesn’t have any effect on PNG.
   */
  quality?: number;
  /**
   * Output format to generate. It can be:
   *  - avif: generate images in AVIF format.
   *  - webp: generate images in Google WebP format. Set quality to 100 to get
   *    the WebP-lossless format.
   *  - json: instead of generating an image, outputs information about the
   *    image, in JSON format. The JSON object will contain image size
   *    (before and after resizing), source image’s MIME type, file size, etc.
   * - jpeg: generate images in JPEG format.
   * - png: generate images in PNG format.
   */
  format?: "avif" | "webp" | "json" | "jpeg" | "png";
  /**
   * Whether to preserve animation frames from input files. Default is true.
   * Setting it to false reduces animations to still images. This setting is
   * recommended when enlarging images or processing arbitrary user content,
   * because large GIF animations can weigh tens or even hundreds of megabytes.
   * It is also useful to set anim:false when using format:"json" to get the
   * response quicker without the number of frames.
   */
  anim?: boolean;
  /**
   * What EXIF data should be preserved in the output image. Note that EXIF
   * rotation and embedded color profiles are always applied ("baked in" into
   * the image), and aren't affected by this option. Note that if the Polish
   * feature is enabled, all metadata may have been removed already and this
   * option may have no effect.
   *  - keep: Preserve most of EXIF metadata, including GPS location if there's
   *    any.
   *  - copyright: Only keep the copyright tag, and discard everything else.
   *    This is the default behavior for JPEG files.
   *  - none: Discard all invisible EXIF metadata. Currently WebP and PNG
   *    output formats always discard metadata.
   */
  metadata?: "keep" | "copyright" | "none";
  /**
   * Strength of sharpening filter to apply to the image. Floating-point
   * number between 0 (no sharpening, default) and 10 (maximum). 1.0 is a
   * recommended value for downscaled images.
   */
  sharpen?: number;
  /**
   * Radius of a blur filter (approximate gaussian). Maximum supported radius
   * is 250.
   */
  blur?: number;
  /**
   * Overlays are drawn in the order they appear in the array (last array
   * entry is the topmost layer).
   */
  draw?: RequestInitCfPropertiesImageDraw[];
  /**
   * Fetching image from authenticated origin. Setting this property will
   * pass authentication headers (Authorization, Cookie, etc.) through to
   * the origin.
   */
  "origin-auth"?: "share-publicly";
}

interface RequestInitCfPropertiesImageMinify {
  javascript?: boolean;
  css?: boolean;
  html?: boolean;
}

type Blah = {
  /**
   * The three-letter [IATA](https://en.wikipedia.org/wiki/IATA_airport_code)
   * airport code of the data center that the request hit.
   *
   * @example "DFW"
   */
  colo: string;

  /**
   * [ASN](https://www.iana.org/assignments/as-numbers/as-numbers.xhtml) of the incoming request.
   *
   * @example 395747
   */
  asn: number;

  /**
   * The organization which owns the ASN of the incoming request.
   *
   * @example "Google Cloud"
   */
  asOrganization: string;

  /**
   * The HTTP Protocol the request used.
   *
   * @example "HTTP/2"
   */
  httpProtocol: string;

  /**
   * The TLS version of the connection to Cloudflare.
   * In requests served over plaintext (without TLS), this property is the empty string `""`.
   *
   * @example "TLSv1.3"
   */
  tlsVersion: "" | string;

  /**
   * The cipher for the connection to Cloudflare.
   * In requests served over plaintext (without TLS), this property is the empty string `""`.
   *
   * @example "AEAD-AES128-GCM-SHA256"
   */
  tlsCipher: "" | string;

  /**
   * Custom metadata set per-host in [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/).
   *
   * This field is only present if you have Cloudflare for SaaS enabled on your account
   * and you have followed the [required steps to enable it]((https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/)).
   */
  hostMetadata?: unknown;

  /**
   * Represents the upstream's response to a
   * [TCP `keepalive` message](https://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html)
   * from cloudflare.
   *
   * For workers with no upstream, this will always be `EdgeRequestKeepAliveStatus.NoKeepAlives`.
   */
  edgeRequestKeepAliveStatus: EdgeRequestKeepAliveStatus;

  /**
   * Information about the client certificate presented to Cloudflare.
   *
   * This is populated when the incoming request is served over TLS using
   * either Cloudflare Access or API Shield (mTLS)
   * and the presented SSL certificate has a valid
   * [Certificate Serial Number](https://ldapwiki.com/wiki/Certificate%20Serial%20Number)
   * (i.e., not `null` or `""`).
   *
   * Otherwise, a set of placeholder values are used.
   *
   * The property `certPresented` will be set to `"1"` when
   * the object is populated (i.e. the above conditions were met).
   */
  tlsClientAuth: TlsClientAuth | TlsClientAuthPlaceholder;

  /**
   * Metadata containing the [`HELLO`](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2) and [`FINISHED`](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9) messages from this request's TLS handshake.
   *
   * If the incoming request was served over plaintext (without TLS) this field is undefined.
   */
  tlsExportedAuthenticator?: ExportedAuthenticatorMetadata;
} & GeographicInformation;

type ExportedAuthenticatorMetadata = {
  /**
   * The client's [`HELLO` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2), encoded in hexadecimal
   *
   * @example "44372ba35fa1270921d318f34c12f155dc87b682cf36a790cfaa3ba8737a1b5d"
   */
  clientHandshake: string;

  /**
   * The server's [`HELLO` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2), encoded in hexadecimal
   *
   * @example "44372ba35fa1270921d318f34c12f155dc87b682cf36a790cfaa3ba8737a1b5d"
   */
  serverHandshake: string;

  /**
   * The client's [`FINISHED` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9), encoded in hexadecimal
   *
   * @example "084ee802fe1348f688220e2a6040a05b2199a761f33cf753abb1b006792d3f8b"
   */
  clientFinished: string;

  /**
   * The server's [`FINISHED` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9)
   */
  serverFinished: string;
};

type GeographicInformation =
  | NoGeographicInformation
  | TorConnection
  | PopulatedGeographicInformation;

type NoGeographicInformation = {};
type TorConnection = { country: "T1" };
type PopulatedGeographicInformation = {
  /**
   * The [ISO 3166-1 Alpha 2](https://www.iso.org/iso-3166-country-codes.html) country code the request originated from.
   *
   * If your worker is [configured to accept TOR connections](https://support.cloudflare.com/hc/en-us/articles/203306930-Understanding-Cloudflare-Tor-support-and-Onion-Routing), this may also be `"T1"`, indicating a request that originated over TOR.
   *
   * If Cloudflare is unable to determine where the request originated this property is omitted.
   *
   * @example "GB"
   */
  country: Iso3166Alpha2Code;

  /**
   * If present, this property indicates that the request originated in the EU
   *
   * @example "1"
   */
  isEUCountry?: "1";

  /**
   * A two-letter code indicating the continent the request originated from.
   *
   * @example "AN"
   */
  continent: ContinentCode;

  /**
   * The city the request originated from
   *
   * @example "Austin"
   */
  city?: string;

  /**
   * Postal code of the incoming request
   *
   * @example "78701"
   */
  postalCode?: string;

  /**
   * Latitude of the incoming request
   *
   * @example "30.27130"
   */
  latitude?: string;

  /**
   * Longitude of the incoming request
   *
   * @example "-97.74260"
   */
  longitude?: string;

  /**
   * Timezone of the incoming request
   *
   * @example "America/Chicago"
   */
  timezone?: string;

  /**
   * If known, the ISO 3166-2 name for the first level region associated with
   * the IP address of the incoming request
   *
   * @example "Texas"
   */
  region?: string;

  /**
   * If known, the ISO 3166-2 code for the first-level region associated with
   * the IP address of the incoming request
   *
   * @example "TX"
   */
  regionCode?: string;

  /**
   * Metro code (DMA) of the incoming request
   *
   * @example "635"
   */
  metroCode?: string;
};

declare const enum Iso3166Alpha2Code {
  Andorra = "AD",
  UnitedArabEmirates = "AE",
  Afghanistan = "AF",
  AntiguaAndBarbuda = "AG",
  Anguilla = "AI",
  Albania = "AL",
  Armenia = "AM",
  Angola = "AO",
  Antarctica = "AQ",
  Argentina = "AR",
  AmericanSamoa = "AS",
  Austria = "AT",
  Australia = "AU",
  Aruba = "AW",
  ÅlandIslands = "AX",
  Azerbaijan = "AZ",
  BosniaAndHerzegovina = "BA",
  Barbados = "BB",
  Bangladesh = "BD",
  Belgium = "BE",
  BurkinaFaso = "BF",
  Bulgaria = "BG",
  Bahrain = "BH",
  Burundi = "BI",
  Benin = "BJ",
  SaintBarthélemy = "BL",
  Bermuda = "BM",
  BruneiDarussalam = "BN",
  BoliviaPlurinationalStateOf = "BO",
  BonaireSintEustatiusAndSaba = "BQ",
  Brazil = "BR",
  Bahamas = "BS",
  Bhutan = "BT",
  BouvetIsland = "BV",
  Botswana = "BW",
  Belarus = "BY",
  Belize = "BZ",
  Canada = "CA",
  CocosKeelingIslands = "CC",
  CongoDemocraticRepublicOfThe = "CD",
  CentralAfricanRepublic = "CF",
  Congo = "CG",
  Switzerland = "CH",
  CôtedIvoire = "CI",
  CookIslands = "CK",
  Chile = "CL",
  Cameroon = "CM",
  China = "CN",
  Colombia = "CO",
  CostaRica = "CR",
  Cuba = "CU",
  CaboVerde = "CV",
  Curaçao = "CW",
  ChristmasIsland = "CX",
  Cyprus = "CY",
  Czechia = "CZ",
  Germany = "DE",
  Djibouti = "DJ",
  Denmark = "DK",
  Dominica = "DM",
  DominicanRepublic = "DO",
  Algeria = "DZ",
  Ecuador = "EC",
  Estonia = "EE",
  Egypt = "EG",
  WesternSahara = "EH",
  Eritrea = "ER",
  Spain = "ES",
  Ethiopia = "ET",
  Finland = "FI",
  Fiji = "FJ",
  FalklandIslandsMalvinas = "FK",
  MicronesiaFederatedStatesOf = "FM",
  FaroeIslands = "FO",
  France = "FR",
  Gabon = "GA",
  UnitedKingdomOfGreatBritainAndNorthernIreland = "GB",
  Grenada = "GD",
  Georgia = "GE",
  FrenchGuiana = "GF",
  Guernsey = "GG",
  Ghana = "GH",
  Gibraltar = "GI",
  Greenland = "GL",
  Gambia = "GM",
  Guinea = "GN",
  Guadeloupe = "GP",
  EquatorialGuinea = "GQ",
  Greece = "GR",
  SouthGeorgiaAndTheSouthSandwichIslands = "GS",
  Guatemala = "GT",
  Guam = "GU",
  GuineaBissau = "GW",
  Guyana = "GY",
  HongKong = "HK",
  HeardIslandAndMcDonaldIslands = "HM",
  Honduras = "HN",
  Croatia = "HR",
  Haiti = "HT",
  Hungary = "HU",
  Indonesia = "ID",
  Ireland = "IE",
  Israel = "IL",
  IsleOfMan = "IM",
  India = "IN",
  BritishIndianOceanTerritory = "IO",
  Iraq = "IQ",
  IranIslamicRepublicOf = "IR",
  Iceland = "IS",
  Italy = "IT",
  Jersey = "JE",
  Jamaica = "JM",
  Jordan = "JO",
  Japan = "JP",
  Kenya = "KE",
  Kyrgyzstan = "KG",
  Cambodia = "KH",
  Kiribati = "KI",
  Comoros = "KM",
  SaintKittsAndNevis = "KN",
  KoreaDemocraticPeoplesRepublicOf = "KP",
  KoreaRepublicOf = "KR",
  Kuwait = "KW",
  CaymanIslands = "KY",
  Kazakhstan = "KZ",
  LaoPeoplesDemocraticRepublic = "LA",
  Lebanon = "LB",
  SaintLucia = "LC",
  Liechtenstein = "LI",
  SriLanka = "LK",
  Liberia = "LR",
  Lesotho = "LS",
  Lithuania = "LT",
  Luxembourg = "LU",
  Latvia = "LV",
  Libya = "LY",
  Morocco = "MA",
  Monaco = "MC",
  MoldovaRepublicOf = "MD",
  Montenegro = "ME",
  SaintMartinFrenchPart = "MF",
  Madagascar = "MG",
  MarshallIslands = "MH",
  NorthMacedonia = "MK",
  Mali = "ML",
  Myanmar = "MM",
  Mongolia = "MN",
  Macao = "MO",
  NorthernMarianaIslands = "MP",
  Martinique = "MQ",
  Mauritania = "MR",
  Montserrat = "MS",
  Malta = "MT",
  Mauritius = "MU",
  Maldives = "MV",
  Malawi = "MW",
  Mexico = "MX",
  Malaysia = "MY",
  Mozambique = "MZ",
  Namibia = "NA",
  NewCaledonia = "NC",
  Niger = "NE",
  NorfolkIsland = "NF",
  Nigeria = "NG",
  Nicaragua = "NI",
  Netherlands = "NL",
  Norway = "NO",
  Nepal = "NP",
  Nauru = "NR",
  Niue = "NU",
  NewZealand = "NZ",
  Oman = "OM",
  Panama = "PA",
  Peru = "PE",
  FrenchPolynesia = "PF",
  PapuaNewGuinea = "PG",
  Philippines = "PH",
  Pakistan = "PK",
  Poland = "PL",
  SaintPierreAndMiquelon = "PM",
  Pitcairn = "PN",
  PuertoRico = "PR",
  PalestineStateOf = "PS",
  Portugal = "PT",
  Palau = "PW",
  Paraguay = "PY",
  Qatar = "QA",
  Réunion = "RE",
  Romania = "RO",
  Serbia = "RS",
  RussianFederation = "RU",
  Rwanda = "RW",
  SaudiArabia = "SA",
  SolomonIslands = "SB",
  Seychelles = "SC",
  Sudan = "SD",
  Sweden = "SE",
  Singapore = "SG",
  SaintHelenaAscensionAndTristanDaCunha = "SH",
  Slovenia = "SI",
  SvalbardAndJanMayen = "SJ",
  Slovakia = "SK",
  SierraLeone = "SL",
  SanMarino = "SM",
  Senegal = "SN",
  Somalia = "SO",
  Suriname = "SR",
  SouthSudan = "SS",
  SaoTomeAndPrincipe = "ST",
  ElSalvador = "SV",
  SintMaartenDutchPart = "SX",
  SyrianArabRepublic = "SY",
  Eswatini = "SZ",
  TurksAndCaicosIslands = "TC",
  Chad = "TD",
  FrenchSouthernTerritories = "TF",
  Togo = "TG",
  Thailand = "TH",
  Tajikistan = "TJ",
  Tokelau = "TK",
  TimorLeste = "TL",
  Turkmenistan = "TM",
  Tunisia = "TN",
  Tonga = "TO",
  Türkiye = "TR",
  TrinidadAndTobago = "TT",
  Tuvalu = "TV",
  TaiwanProvinceOfChina = "TW",
  TanzaniaUnitedRepublicOf = "TZ",
  Ukraine = "UA",
  Uganda = "UG",
  UnitedStatesMinorOutlyingIslands = "UM",
  UnitedStatesOfAmerica = "US",
  Uruguay = "UY",
  Uzbekistan = "UZ",
  HolySee = "VA",
  SaintVincentAndTheGrenadines = "VC",
  VenezuelaBolivarianRepublicOf = "VE",
  VirginIslandsBritish = "VG",
  VirginIslandsUS = "VI",
  VietNam = "VN",
  Vanuatu = "VU",
  WallisAndFutuna = "WF",
  Samoa = "WS",
  Yemen = "YE",
  Mayotte = "YT",
  SouthAfrica = "ZA",
  Zambia = "ZM",
  Zimbabwe = "ZW",
}

type TlsClientAuth = {
  /** Always `"1"`, indicating that the certificate was presented */
  certPresented: "1";

  /** Result of certificate verification. */
  certVerified: Exclude<CertVerificationStatus, CertVerificationStatus.Absent>;

  /** The presented certificate's revokation status.
   *
   * - A value of `"1"` indicates the certificate has been revoked
   * - A value of `"0"` indicates the certificate has not been revoked
   */
  certRevoked: "1" | "0";

  /** The certificate issuer's distinguished name */
  certIssuerDN: "" | string;

  /** The certificate subject's distinguished name */
  certSubjectDN: "" | string;

  /** The certificate issuer's distinguished name (RFC 2253 formatted) */
  certIssuerDNRFC2253: "" | string;

  /** The certificate subject's distinguished name (RFC 2253 formatted) */
  certSubjectDNRFC2253: "" | string;

  /** The certificate issuer's distinguished name (legacy policies) */
  certIssuerDNLegacy: "" | string;

  /** The certificate subject's distinguished name (legacy policies) */
  certSubjectDNLegacy: "" | string;

  /** The certificate's serial number */
  certSerial: "" | string;

  /** The certificate issuer's serial number */
  certIssuerSerial: "" | string;

  /** The certificate's Subject Key Identifier */
  certSKI: "" | string;

  /** The certificate issuer's Subject Key Identifier */
  certIssuerSKI: "" | string;

  /** The certificate's SHA-1 fingerprint */
  certFingerprintSHA1: "" | string;

  /** The certificate's SHA-256 fingerprint */
  certFingerprintSHA256: "" | string;

  /**
   * The effective starting date of the certificate
   *
   * @example "Dec 22 19:39:00 2018 GMT"
   */
  certNotBefore: "" | string;

  /**
   * The effective expiration date of the certificate
   *
   * @example "Dec 22 19:39:00 2018 GMT"
   */
  certNotAfter: "" | string;
};

declare const enum ContinentCode {
  Africa = "AF",
  Antarctica = "AN",
  Asia = "AS",
  Europe = "EU",
  NorthAmerica = "NA",
  Oceania = "OC",
  SouthAmerica = "SA",
}

type TlsClientAuthPlaceholder = {
  certPresented: "0";
  certVerified: CertVerificationStatus.Absent;
  certRevoked: "0";
  certIssuerDN: "";
  certSubjectDN: "";
  certIssuerDNRFC2253: "";
  certSubjectDNRFC2253: "";
  certIssuerDNLegacy: "";
  certSubjectDNLegacy: "";
  certSerial: "";
  certIssuerSerial: "";
  certSKI: "";
  certIssuerSKI: "";
  certFingerprintSHA1: "";
  certFingerprintSHA256: "";
  certNotBefore: "";
  certNotAfter: "";
};

declare const enum CertVerificationStatus {
  /** Authentication succeeded */
  Success = "SUCCESS",

  /** No certificate was presented */
  Absent = "NONE",

  /** Failed because the certificate was self-signed */
  SelfSigned = "FAILED:self signed certificate",

  /** Failed because the certificate failed a trust chain check */
  Untrusted = "FAILED:unable to verify the first certificate",

  /** Failed because the certificate not yet valid */
  NotYetValid = "FAILED:certificate is not yet valid",

  /** Failed because the certificate is expired */
  Expired = "FAILED:certificate has expired",

  /** Failed for another unspecified reason */
  Failed = "FAILED",
}

/**
 * An upstream endpoint's response to
 * a TCP `keepalive` message from Cloudflare.
 */
declare const enum EdgeRequestKeepAliveStatus {
  Unknown = 0,
  /** no keepalives (not found) */
  NoKeepAlives = 1,

  /** no connection re-use, opening keepalive connection failed */
  NoReuseOpenFailed = 2,

  /** no connection re-use, keepalive accepted and saved */
  NoReuseAccepted = 3,

  /** connection re-use, refused by the origin server (`TCP FIN`) */
  ReuseRefused = 4,

  /** connection re-use, accepted by the origin server */
  ReuseAccepted = 5,
}

/**
 * In addition to the properties on the standard Request object,
 * the cf object contains extra information about the request provided
 * by Cloudflare's edge.
 *
 * Note: Currently, settings in the cf object cannot be accessed in the
 * playground.
 */
interface IncomingRequestCfProperties {
  /**
   * (e.g. 395747)
   */
  asn: number;
  /**
   * The organisation which owns the ASN of the incoming request.
   * (e.g. Google Cloud)
   */
  asOrganization: string;
  botManagement?: IncomingRequestCfPropertiesBotManagement;
  city?: string;
  clientAcceptEncoding?: string;
  clientTcpRtt?: number;
  clientTrustScore?: number;
  /**
   * The three-letter airport code of the data center that the request
   * hit. (e.g. "DFW")
   */
  colo: string;
  continent?: string;
  /**
   * The two-letter country code in the request. This is the same value
   * as that provided in the CF-IPCountry header. (e.g. "US")
   */
  country: string;
  httpProtocol: string;
  isEUCountry?: string;
  latitude?: string;
  longitude?: string;
  /**
   * DMA metro code from which the request was issued, e.g. "635"
   */
  metroCode?: string;
  postalCode?: string;
  /**
   * e.g. "Texas"
   */
  region?: string;
  /**
   * e.g. "TX"
   */
  regionCode?: string;
  /**
   * e.g. "weight=256;exclusive=1"
   */
  requestPriority: string;
  /**
   * e.g. "America/Chicago"
   */
  timezone?: string;
  tlsVersion: string;
  tlsCipher: string;
  tlsClientAuth: IncomingRequestCfPropertiesTLSClientAuth;
}

interface IncomingRequestCfPropertiesBotManagement {
  corporateProxy: boolean;
  ja3Hash?: string;
  score: number;
  staticResource: boolean;
  verifiedBot: boolean;
}

interface IncomingRequestCfPropertiesTLSClientAuth {
  certIssuerDNLegacy: string;
  certIssuerDN: string;
  certIssuerDNRFC2253: string;
  certIssuerSKI: string;
  certIssuerSerial: string;
  certPresented: "0" | "1";
  certSubjectDNLegacy: string;
  certSubjectDN: string;
  certSubjectDNRFC2253: string;
  /** In format "Dec 22 19:39:00 2018 GMT" */
  certNotBefore: string;
  /** In format "Dec 22 19:39:00 2018 GMT" */
  certNotAfter: string;
  certSerial: string;
  certFingerprintSHA1: string;
  /** "SUCCESS", "FAILED:reason", "NONE" */
  certVerified: string;
  certRevoked: string;
  certSKI: string;
}

export {};
