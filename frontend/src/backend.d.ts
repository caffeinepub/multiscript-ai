import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SocialScriptQuery {
    topic: string;
    content: string;
    hashtags: string;
    hooks: string;
    body: string;
    tone: Tone;
    platform: SocialMediaPlatform;
    callToAction: string;
    timestamp: bigint;
}
export interface AdminKeys {
    groqKey: string;
    geminiKey: string;
}
export enum SocialMediaPlatform {
    linkedin = "linkedin",
    tiktok = "tiktok",
    instagram = "instagram",
    youtube = "youtube"
}
export enum Tone {
    funny = "funny",
    hype = "hype",
    professional = "professional"
}
export interface backendInterface {
    generateScript(platform: SocialMediaPlatform, topic: string, tone: Tone): Promise<string>;
    getAdminKeys(): Promise<AdminKeys | null>;
    getScriptHistory(): Promise<Array<SocialScriptQuery>>;
    getScriptHistoryForCreator(): Promise<Array<string>>;
    getScriptsByPlatform(platform: SocialMediaPlatform): Promise<Array<string>>;
    getScriptsByPlatformAndTone(platform: SocialMediaPlatform, tone: Tone): Promise<Array<string>>;
    setAdminKeys(geminiKey: string, groqKey: string): Promise<void>;
}
