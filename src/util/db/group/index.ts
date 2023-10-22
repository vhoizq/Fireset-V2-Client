import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

import type { Group, GroupMessage, User } from "@/util/db/schemas/schema";

import { getUsersInGroup, usersResponse } from "@/util/roblox/users.server";

export type NewGroup = {
  name?: string;
  description?: string;
  groupId?: number;
  discordUrl?: string;
};

export type NewGroupMessage = {
  title?: string;
  body?: string;
  link?: string;
};

export type GroupDetails = Group & {
  _count: {
    users: number;
  };
};

export type GroupMessageDetails = GroupMessage & {
  author: User;
};

export const getGroup = async (id: string) => {
  try {
    const { data: group, error } = await supabase
      .from('group')
      .select('*')
      .eq('id', id)
      .single();

      console.log(group)

    if (error) {
      throw error;
    }

    return {
      ...group!,
      apiToken: null,
    };
  } catch (error) {
    throw Error();
  }
};

export const getGroupOwner = async (id: string) => {
  try {
    const { data: users, error } = await supabase
      .from('groupUser')
      .select('userId')
      .eq('id', id)

      console.log(id)


    if (error) {
      throw error;
    }

    console.log(users)
    return users && users[0];
  } catch (error) {
    throw Error();
  }
};

export const getGroupMessages = async (id: string, skip?: number) => {
  try {
    const { data: messages, error } = await supabase
      .from('groupMessages')
      .select('*')
      .eq('groupId', id)
      .eq('isActive', true)
      .order('createdAt', { ascending: false })
      .range(skip || 0, (skip || 0) + 10);

    if (error) {
      throw error;
    }

    return messages || [];
  } catch (error) {
    throw Error();
  }
};

export const getGroupRole = async (id: string, userId: string) => {
  try {
    const { data: groupUsers, error } = await supabase
      .from('groupUser')
      .select('role')
      .eq('groupId', id)
      .eq('userId', userId);

    if (error) {
      throw error;
    }

    return groupUsers && groupUsers[0];
  } catch (error) {
    throw Error();
  }
};

export const getGroupUsers = async (id: string) => {
  try {
    const { data: groupUsers, error } = await supabase
      .from('groupUser')
      .select('*')
      .eq('groupId', id);

    if (error) {
      throw error;
    }

    return groupUsers || [];
  } catch (error) {
    throw Error();
  }
};
