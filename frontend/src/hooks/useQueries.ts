import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { SocialMediaPlatform, Tone } from '../backend';

export function useGenerateScript() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      platform,
      topic,
      tone,
    }: {
      platform: SocialMediaPlatform;
      topic: string;
      tone: Tone;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.generateScript(platform, topic, tone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scriptHistory'] });
    },
  });
}

export function useGetScriptHistory() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['scriptHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getScriptHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAdminKeys() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['adminKeys'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminKeys();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetAdminKeys() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ geminiKey, groqKey }: { geminiKey: string; groqKey: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.setAdminKeys(geminiKey, groqKey);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminKeys'] });
    },
  });
}
