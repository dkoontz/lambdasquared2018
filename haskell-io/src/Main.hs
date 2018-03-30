module Main where

import System.Random
import Control.Monad
import System.IO

main = do
  putStrLn "Hello, world!"


-- main = do
--   putStrLn "What is your name?"
--   name <- getLine
--   putStrLn ("Hi " ++ name)


-- main = do
--   putStrLn "Time to roll some dice..."
--   roll1 <- getStdRandom (randomR (1 :: Integer, 6 :: Integer))
--   roll2 <- getStdRandom (randomR (1 :: Integer, 6 :: Integer))
  
--   if roll1 == 1 && roll2 == 1 then
--     putStrLn "Snake eyes!"
--   else
--     putStrLn ((show roll1) ++ ", " ++ (show roll2))


-- main = do
--   putStrLn "Time to roll some dice..."
--   let rollD6 = getStdRandom (randomR (1 :: Integer, 6 :: Integer))
--   roll1 <- rollD6
--   roll2 <- rollD6

--   if roll1 == 1 && roll2 == 1 then
--     putStrLn "Snake eyes!"
--   else
--     putStrLn ((show roll1) ++ ", " ++ (show roll2))


-- main = do
--   contents <- readFile "test.txt"

--   let contentsByLine = lines contents
--   let linesSplitIntoWords = fmap words contentsByLine
--   let reversedLines = fmap reverse linesSplitIntoWords
--   let reversedContentsByLine = fmap unwords reversedLines
--   let reversedContent = unlines reversedContentsByLine

--   putStrLn reversedContent
--   writeFile "reversed-test.txt" reversedContent


-- main = do
--   contents <- readFile "test.txt"

--   let reversedContents = unlines $ fmap unwords $ fmap reverse $ fmap words $ lines contents
  
--   putStrLn reversedContents
--   writeFile "reversed-test.txt" reversedContents


-- main = do
--   contents <- readFile "test.txt"

--   let reversedContents = unlines $ fmap (unwords . reverse . words) $ lines contents
  
--   putStrLn reversedContents
--   writeFile "reversed-test.txt" reversedContents