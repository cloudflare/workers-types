interface AesCbcParams extends Algorithm {
  name: AesAlgorithm
  iv: BufferSource
}

interface AesGcmParams extends Algorithm {
  name: AesAlgorithm
  additionalData?: BufferSource
  iv: BufferSource
  tagLength?: number
}

interface AesKeyGenParams extends Algorithm {
  name: AesAlgorithm
  length: number
}

interface Algorithm {
  name: string
}

interface Crypto {
  getRandomValues(buffer: ArrayBuffer): ArrayBuffer
  readonly subtle: SubtleCrypto
}

/** The CryptoKey dictionary of the Web Crypto API represents a cryptographic key. */
declare class CryptoKey {
  constructor()
  readonly algorithm: KeyAlgorithm
  readonly extractable: boolean
  readonly type: KeyType
  readonly usages: KeyUsage[]
}

interface CryptoKeyPair {
  privateKey: CryptoKey
  publicKey: CryptoKey
}

interface EcdsaParams extends Algorithm {
  name: EcAlgorithm
  hash: LongHashAlgorithmIdentifier
}

interface EcKeyGenParams extends Algorithm {
  name: EcAlgorithm
  namedCurve: NamedCurve
}

interface EcKeyImportParams extends Algorithm {
  name: EcAlgorithm
  namedCurve: NamedCurve
}

interface HmacKeyGenParams extends Algorithm {
  name: 'HMAC'
  hash: LongHashAlgorithmIdentifier
  length?: number
}

interface HmacImportParams extends Algorithm {
  hash: LongHashAlgorithmIdentifier
  length?: number
}

interface JsonWebKey {
  alg?: string
  crv?: string
  d?: string
  dp?: string
  dq?: string
  e?: string
  ext?: boolean
  k?: string
  key_ops?: string[]
  kty?: string
  n?: string
  oth?: RsaOtherPrimesInfo[]
  p?: string
  q?: string
  qi?: string
  use?: string
  x?: string
  y?: string
}

interface KeyAlgorithm {
  name: string
}

interface Pbkdf2Params extends Algorithm {
  name: 'PBKDF2'
  hash: HashAlgorithmIdentifier
  iterations: number
  salt: BufferSource
}

interface RsaHashedImportParams extends Algorithm {
  name: RSAHashedAlgorithms
  hash: LongHashAlgorithmIdentifier
}

interface RsaHashedKeyGenParams extends RsaKeyGenParams {
  hash: LongHashAlgorithmIdentifier
}

interface RsaKeyGenParams extends Algorithm {
  name: RSAHashedAlgorithms
  modulusLength: number
  publicExponent: BigInteger
}

interface RsaOtherPrimesInfo {
  d?: string
  r?: string
  t?: string
}

interface RsaPssParams extends Algorithm {
  name: 'RSA-PSS'
  saltLength: number
}

/** This Web Crypto API interface provides a number of low-level cryptographic functions. It is accessed via the Crypto.subtle properties available in a window context (via Window.crypto). */
interface SubtleCrypto {
  decrypt(algorithm: AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>
  deriveBits(algorithm: Pbkdf2Params, baseKey: CryptoKey, length: number): Promise<ArrayBuffer>
  deriveKey(algorithm: Pbkdf2Params, baseKey: CryptoKey, derivedKeyAlgorithm: HmacKeyGenParams | AesKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>
  digest(algorithm: HashAlgorithmIdentifier | 'MD5', data: BufferSource): Promise<ArrayBuffer>
  encrypt(algorithm: AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>
  exportKey(format: 'jwk', key: CryptoKey): Promise<JsonWebKey>
  exportKey(format: 'raw' | 'pkcs8' | 'spki', key: CryptoKey): Promise<ArrayBuffer>
  generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair>
  generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>
  importKey(
    format: 'jwk',
    keyData: JsonWebKey,
    algorithm: RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesAlgorithm | { name: AesAlgorithm } | 'PBKDF2',
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>
  importKey(
    format: 'raw' | 'pkcs8' | 'spki',
    keyData: TypedArray | DataView | ArrayBuffer,
    algorithm: RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesAlgorithm | { name: AesAlgorithm } | 'PBKDF2',
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>
  sign(
    algorithm: 'RSASSA-PKCS1-v1_5' | { name: 'RSASSA-PKCS1-v1_5' } | RsaPssParams | EcdsaParams | 'HMAC' | { name: 'HMAC' },
    key: CryptoKey,
    data: TypedArray | DataView | ArrayBuffer,
  ): Promise<ArrayBuffer>
  unwrapKey(
    format: 'raw' | 'pkcs8' | 'spki' | 'jwk',
    wrappedKey: TypedArray | DataView | ArrayBuffer,
    unwrappingKey: CryptoKey,
    unwrapAlgorithm: AesCbcParams | AesGcmParams,
    unwrappedKeyAlgorithm: RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesAlgorithm | { name: AesAlgorithm },
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>
  verify(
    algorithm: 'RSASSA-PKCS1-v1_5' | { name: 'RSASSA-PKCS1-v1_5' } | RsaPssParams | EcdsaParams,
    key: CryptoKey,
    signature: TypedArray | DataView | ArrayBuffer,
    data: TypedArray | DataView | ArrayBuffer,
  ): Promise<boolean>
  wrapKey(format: 'raw' | 'pkcs8' | 'spki' | 'jwk' | string, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: AesCbcParams | AesGcmParams): Promise<ArrayBuffer>
}

declare var crypto: Crypto

type AesAlgorithm = 'AES-CBC' | 'AES-GCM'
type BigInteger = Uint8Array
type EcAlgorithm = 'ECDSA'
type KeyType = 'private' | 'public' | 'secret'
type KeyUsage = 'decrypt' | 'deriveBits' | 'deriveKey' | 'encrypt' | 'sign' | 'unwrapKey' | 'verify' | 'wrapKey'
type HashAlgorithmIdentifier = 'SHA-1' | LongHashAlgorithmIdentifier
type NamedCurve = 'P-256' | 'P-384' | 'P-521'
type RSAHashedAlgorithms = 'RSASSA-PKCS1-v1_5' | 'RSA-PSS'
type LongHashAlgorithmIdentifier = 'SHA-256' | 'SHA-384' | 'SHA-512'
