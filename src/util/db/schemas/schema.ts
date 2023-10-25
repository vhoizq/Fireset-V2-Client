import { Timestamp } from "intercom-client";

export interface User {
  id: string;
  sessionToken: string;
  userId: string;
  name: string;
  username: string;
  preferredUsername: string;
  email?: string;
  verified: boolean;
  createdAt: Date;
  isActive: boolean;
  isBeta: boolean;
  access: boolean;
  admin: boolean;
  banned: boolean;
  support: boolean;
  status: UserStatus;
  groups: GroupUser[];
  sessions: UserSession[];
  messages: GroupMessage[];
  activities: GroupActivity[];
  vacations: GroupVacation[];
  modifiedVacations: GroupVacation[];
  alerts: GroupAlert[];
  createdAlerts: GroupAlert[];
  rankings: GroupRanking[];
  createdEvents: GroupEvent[];
  events: GroupEvent[];
  archives: GroupArchive[];
  cards: GroupCard[];
  reports: Report[];
  tickets: GroupTicket[];
  ticketResponses: TicketResponse[];
}

export interface UserSession {
  id: string;
  cookie: string;
  iv: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  expired: boolean;
  user: User;
}

export interface UserRole {
  id: string;
  name: string;
  description?: string;
  level: number;
  admin: boolean;
  publicRelations: boolean;
  humanResources: boolean;
  developer: boolean;
  review: boolean;
  support: boolean;
  users: GroupUser[];
}

export interface GroupUser {
  id: string;
  userId: string;
  groupId: string;
  roleId: string;
  totalTime: number;
  user: User;
  group: Group;
  role: UserRole;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  discordUrl?: string;
  groupId: string;
  verified: boolean;
  unlimited: boolean;
  createdAt: Date;
  syncedAt: Date;
  primaryColor: string;
  trackingRank?: number;
  apiToken?: string;
  users: GroupUser[];
  places: GroupPlace[];
  messages: GroupMessage[];
  activities: GroupActivity[];
  vacations: GroupVacation[];
  alerts: GroupAlert[];
  rankings: GroupRanking[];
  events: GroupEvent[];
  archives: GroupArchive[];
  times: GroupTimes[];
  cards: GroupCard[];
  monitors: GroupMonitor[];
  applications: GroupApplication[];
  feedback: GroupFeedback[];
  tickets: GroupTicket[];
  ticketTypes: TicketType[];
}

export interface GroupMessage {
  id: string;
  groupId: string;
  title: string;
  body: string;
  link?: string;
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
  group: Group;
  author: User;
}

export interface GroupActivity {
  id: string;
  groupId: string;
  robloxId: string;
  placeId?: string;
  start: Date;
  end?: Date;
  length?: number;
  createdAt: Date;
  createdBy?: string;
  isActive: boolean;
  archived: boolean;
  group: Group;
  author?: User;
}

export interface GroupVacation {
  id: string;
  groupId: string;
  start: Date;
  end: Date;
  description: string;
  status: VacationStatus;
  createdAt: Date;
  createdBy: string;
  modifiedBy?: string;
  group: Group;
  author: User;
  modifier?: User;
}

export interface GroupAlert {
  id: string;
  groupId: string;
  title: string;
  description: string;
  type: AlertType;
  start?: Date;
  end?: Date;
  targetId: string;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  group: Group;
  author: User;
  target: User;
}

export interface GroupRanking {
  id: string;
  groupId: string;
  robloxId: string;
  from: number;
  to: number;
  description: string;
  createdAt: Date;
  createdBy?: string;
  group: Group;
  author?: User;
}

export interface GroupEvent {
  id: string;
  groupId: string;
  title: string;
  description: string;
  location?: string;
  type: EventType;
  start: Date;
  end: Date;
  archived: boolean;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  group: Group;
  author: User;
  users: User[];
}

export interface GroupArchive {
  id: string;
  groupId: string;
  alertCount: number;
  terminateCount: number;
  createdAt: Date;
  createdBy: string;
  group: Group;
  author: User;
}

export interface GroupTimes {
  id: string;
  display: string;
  value: string;
  groupId: string;
  group: Group;
}

export interface GroupMonitor {
  id: string;
  groupId: string;
  userCount: number;
  employeeCount: number;
  avgChats: number;
  avgTime: number;
  avgCount: number;
  createdAt: Date;
  group: Group;
}

export interface GroupApplication {
  id: string;
  groupId: string;
  title: string;
  description: string;
  submitText: string;
  quiz: boolean;
  isActive: boolean;
  createdAt: Date;
  group: Group;
  questions: ApplicationQuestion[];
  instances: ApplicationInstance[];
}

export interface ApplicationQuestion {
  id: string;
  applicationId: string;
  title: string;
  description?: string;
  type: QuestionType;
  options: string[];
  correct?: string;
  weight: number;
  required: boolean;
  application: GroupApplication;
  instances: QuestionInstance[];
}

export interface ApplicationInstance {
  id: string;
  applicationId: string;
  userId?: string;
  userName?: string;
  points?: number;
  createdAt: Date;
  status: ApplicationStatus;
  questions: QuestionInstance[];
  application: GroupApplication;
}

export interface QuestionInstance {
  id: string;
  instanceId: string;
  questionId: string;
  response: string;
  application: ApplicationInstance;
  question: ApplicationQuestion;
}

export interface GroupCard {
  id: string;
  title: string;
  description: string;
  type: CardType;
  status: CardStatus;
  links: string[];
  dueAt?: Date;
  groupId: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
  tasks: CardTask[];
  group: Group;
  author: User;
}

export interface CardTask {
  id: string;
  name: string;
  completed: boolean;
  cardId: string;
  card: GroupCard;
}

export interface GroupPlace {
  id: string;
  groupId: string;
  placeId: string;
  placeName: string;
  averageRating: number;
  averageTime: number;
  ratingEntries: number;
  timeEntries: number;
  createdAt: Date;
  isActive: boolean;
  group: Group;
  feedback: GroupFeedback[];
}

export interface GroupFeedback {
  id: string;
  groupId: string;
  description: string;
  rating: number;
  placeId: string;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  group: Group;
  place: GroupPlace;
}

export interface GroupTicket {
  id: string;
  groupId: string;
  title: string;
  description: string;
  typeId: string;
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
  group: Group;
  user: User;
  type: TicketType;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  message: string;
  createdAt: Date;
  createdBy: string;
  ticket: GroupTicket;
  user: User;
}

export interface TicketType {
  id: string;
  groupId: string;
  name: string;
  createdAt: Date;
  group: Group;
  tickets: GroupTicket[];
}

export interface Report {
  id: string;
  description: string;
  category: ReportCategory;
  reportType: ReportType;
  targetId: string;
  reviewed: boolean;
  createdBy: string;
  createdAt: Date;
  author: User;
}

enum EventType {
  TRAINING,
  INTERVIEW,
  SESSION,
  MEETING,
}

enum RankingType {
  MANUAL,
  AUTOMATED,
  SYSTEM,
}

enum AlertType {
  WARNING,
  TERMINATION,
  SUSPENSION,
}

enum VacationStatus {
  PENDING,
  DENIED,
  APPROVED,
}

enum UserStatus {
  OFFLINE,
  ONLINE,
  INACTIVE,
}

enum CardStatus {
  TO_DO,
  IN_PROGRESS,
  IN_TESTING,
  COMPLETED,
}

enum CardType {
  SUGGESTION,
  DEPLOYMENT,
  RELEASE,
  FEATURE,
  EVENT,
  BUG,
}

enum ReportType {
  GROUP,
  MESSAGE,
  USER,
}

enum ReportCategory {
  INAPPROPRIATE_CONTENT,
  UNOFFICIAL_COPY,
  ALT_ACCOUNT,
  SPAM,
}

enum QuestionType {
  TEXT,
  SELECT,
  CHECK,
}

enum ApplicationStatus {
  PENDING,
  ACCEPTED,
  DENIED,
}
