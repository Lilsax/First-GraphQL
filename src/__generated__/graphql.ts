/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Author of a complete Track or a Module */
export type Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  /** Author's first and last name */
  name: Scalars['String']['output'];
  /** Author's profile picture */
  photo?: Maybe<Scalars['String']['output']>;
};

export type IncrementTrackViewsResponse = {
  __typename?: 'IncrementTrackViewsResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
  /** Newly updated track after a successful mutation */
  track?: Maybe<Track>;
};

/** A Module is a single unit of teaching. Multiple Modules compose a Track */
export type Module = {
  __typename?: 'Module';
  /** The module's text-based description, can be in markdown format. In case of a video, it will be the enriched transcript */
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The module's length in minutes */
  length?: Maybe<Scalars['Int']['output']>;
  /** The module's title */
  title: Scalars['String']['output'];
  /** The module's video url, for video-based modules */
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Increment the number of views of a given track, when the track card is clicked */
  incrementTrackViews: IncrementTrackViewsResponse;
};


export type MutationIncrementTrackViewsArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Fetch a specific module, provided a module's ID */
  module: Module;
  /** Fetch a specific track, provided a track's ID */
  track: Track;
  /** Query to get tracks array for the homepage grid */
  tracksForHome: Array<Track>;
};


export type QueryModuleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTrackArgs = {
  id: Scalars['ID']['input'];
};

/** A track is a group of Modules that teaches about a specific topic */
export type Track = {
  __typename?: 'Track';
  /** The track's main Author */
  author: Author;
  /** The track's complete description, can be in markdown format */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The track's approximate length to complete, in minutes */
  length?: Maybe<Scalars['Int']['output']>;
  /** The track's complete array of Modules */
  modules: Array<Module>;
  /** The number of modules this track contains */
  modulesCount?: Maybe<Scalars['Int']['output']>;
  /** The number of times a track has been viewed */
  numberOfViews: Scalars['Int']['output'];
  /** The track's illustration to display in track card or track page detail */
  thumbnail: Scalars['String']['output'];
  /** The track's title */
  title: Scalars['String']['output'];
};
