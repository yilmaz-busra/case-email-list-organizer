# Recipient Management Component App

This project is a React and TypeScript-based component that allows users to manage email recipients through features like autocomplete, email validation, domain-based grouping, and recipient selection. The functionality is designed to handle both individual email addresses and groups of emails that share the same company domain.

## Features

### View All Recipients:

Displays a list of available recipients, either as individual emails or grouped by company domain.

### Select Recipients:

Users can select an individual email or an entire company domain, which adds all associated emails to the selected recipients' list.

### Autocomplete Search:

Users can enter the name of a company into an autocomplete search and select a recipient from the suggested results.

### Add Custom Email:

Users can manually enter and add any valid email address to the list of available recipients.


## How It Works

### Search & Autocomplete:
The user can start typing a company name or an email address. The component filters the list of available recipients based on the input, displaying suggestions.
### Adding Recipients:
Users can either select from the filtered recipients or enter a new email address manually, which is validated before being added.
### Grouping Recipients:
Selected recipients are grouped by domain, with the option to expand and view individual members of each group.
### Removing Recipients:
 Users can remove a single recipient or all recipients that share the same domain with a single action.

## Technologies
###React: UI library for building user interfaces.
###TypeScript: Strictly typed programming language to ensure better code quality.
###Lodash: Utility library for grouping and filtering recipients by domain.
###Lodash: CSS: Used for styling the component layout.


