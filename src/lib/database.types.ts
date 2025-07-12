// This file is no longer needed as we are using local data.
// It can be safely removed.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
