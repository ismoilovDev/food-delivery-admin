import { apiClient } from "../client";
import type { components } from "../schema.d.ts";

type LoginReqDto = components["schemas"]["LoginReqDto"];
type TokenDto = components["schemas"]["TokenDto"];
type ResponseDtoTokenDto = components["schemas"]["ResponseDtoTokenDto"];

export async function login(body: LoginReqDto): Promise<ResponseDtoTokenDto> {
	const { data, error } = await apiClient.POST("/api/auth/login", { body });
	if (error) throw error;
	return data;
}

export type { LoginReqDto, TokenDto };
