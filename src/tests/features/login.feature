@ui
Feature: Verify user login and profile update

  Background:
    Given user registers for the application

  Scenario: Login should be success
    When User navigates to the application
    And User click on the login link
    And User login to the application
    Then Login should be success
    When User click on the profile link
    And User update the 'last_name' field with 'updated' text
    When user update the profile
    Then User should get message "Your profile is successfully Updated!"

  Scenario: validate First Name is mandatory field
    When User navigates to the application
    And User click on the login link
    And User login to the application
    Then Login should be success
    When User click on the profile link
    And User try to update the profile without '#first_name'
    When user update the profile
    Then User should get message "The first name field is required. "

  Scenario: validate last Name is mandatory field
  When User navigates to the application
    And User click on the login link
    And User login to the application
    Then Login should be success
    When User click on the profile link
    And User try to update the profile without '#last_name'
    When user update the profile
    Then User should get message "The last name field is required. "
