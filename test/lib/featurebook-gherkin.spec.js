'use strict';

var gherkin = require('../../lib/featurebook-gherkin');
var chai = require('chai');
var should = chai.should();

describe('featurebook-gherkin', function () {

  describe('#parse', function () {

    it('should parse a feature written in Polish', function () {
      var featureAsString =
        "# language: pl\n" +
        "Funkcja: Logowanie do aplikacji\n" +
        "\n" +
        "  Scenariusz: Logowanie jako admin\n" +
        "    Mając otwartą stronę \"/login.com\"\n" +
        "    Kiedy wpiszesz \"admin\" jako nazwę\n" +
        "    I wpiszesz \"***\" jako hasło\n" +
        "    I klikniesz przycisk \"Loguj\"\n" +
        "    Wtedy zalogujesz się jako administrator\n"

      var feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'pl');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Funkcja');
      feature.should.have.property('name', 'Logowanie do aplikacji');

      var scenarioDefinitions = feature.scenarioDefinitions;

      scenarioDefinitions[0].should.have.deep.property('type', 'Scenario');
      scenarioDefinitions[0].should.have.deep.property('keyword', 'Scenariusz');
      scenarioDefinitions[0].should.have.deep.property('name', 'Logowanie jako admin');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Mając ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'otwartą stronę "/login.com"');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'Kiedy ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'wpiszesz "admin" jako nazwę');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'I ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'wpiszesz "***" jako hasło');

      scenarioDefinitions[0].should.have.deep.property('steps[3].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[3].keyword', 'I ');
      scenarioDefinitions[0].should.have.deep.property('steps[3].text', 'klikniesz przycisk "Loguj"');

      scenarioDefinitions[0].should.have.deep.property('steps[4].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[4].keyword', 'Wtedy ');
      scenarioDefinitions[0].should.have.deep.property('steps[4].text', 'zalogujesz się jako administrator');
    });

    it('should parse a feature with a single scenario', function () {
      var featureAsString =
        "Feature: Hello World\n" +
        "\n" +
        "  Hey Ma this feature has a very nice description with image\n" +
        "\n" +
        "  ![Hello Screenshot](file://assets/images/hello_world.png)\n" +
        "\n" +
        "  Scenario: Look Ma\n" +
        "    Given I am in a browser\n" +
        "    When I make a syntax error\n" +
        "    Then stuff should be red\n";

      var feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'en');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Feature');
      feature.should.have.property('name', 'Hello World');

      var scenarioDefinitions = feature.scenarioDefinitions;
      scenarioDefinitions[0].should.have.property('type', 'Scenario');
      scenarioDefinitions[0].should.have.property('keyword', 'Scenario');
      scenarioDefinitions[0].should.have.property('name', 'Look Ma');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Given ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'I am in a browser');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'When ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'I make a syntax error');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'Then ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'stuff should be red');
    });

    it('should parse a feature with a single scenario outline', function () {
      var featureAsString =
        "Feature: Eating cucumbers\n" +
        "\n" +
        "  Scenario Outline: Eat\n" +
        "    Given there are <start> cucumbers\n" +
        "    When I eat <eat> cucumbers\n" +
        "    Then I should have <left> cucumbers\n" +
        "\n" +
        "  Examples:\n" +
        "    | start | eat | left |\n" +
        "    | 12    | 5   | 7    |\n" +
        "    | 20    | 5   | 15   |\n";

      var feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'en');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Feature');
      feature.should.have.property('name', 'Eating cucumbers');

      var scenarioDefinitions = feature.scenarioDefinitions;
      scenarioDefinitions[0].should.have.property('type', 'ScenarioOutline');
      scenarioDefinitions[0].should.have.property('keyword', 'Scenario Outline');
      scenarioDefinitions[0].should.have.property('name', 'Eat');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Given ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'there are <start> cucumbers');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'When ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'I eat <eat> cucumbers');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'Then ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'I should have <left> cucumbers');

      scenarioDefinitions[0].examples[0].should.have.property('type', 'Examples');
      scenarioDefinitions[0].examples[0].should.have.property('keyword', 'Examples');

      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[0].value', 'start');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[1].value', 'eat');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[2].value', 'left');

      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[0].value', '12');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[1].value', '5');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[2].value', '7');

      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[0].value', '20');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[1].value', '5');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[2].value', '15');
    });

    it('should parse a feature with the background', function () {
      var featureAsString =
        'Feature: Simple feature with background\n' +
        '\n' +
        '  A simple feature to make sure we can parse the `Background` keyword.\n' +
        '\n' +
        '  Background: a background can have name\n' +
        '\n' +
        '  As well as description\n' +
        '\n' +
        '    Given background step 1\n' +
        '    And background step 2\n' +
        '    And background step 3\n' +
        '\n' +
        '  Scenario: Scenario 1\n' +
        '    Given scenario step 1\n' +
        '    When scenario step 2\n' +
        '    Then scenario step 3\n';

      var feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'en');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Feature');
      feature.should.have.property('name', 'Simple feature with background');

      feature.background.should.have.property('type', 'Background');
      feature.background.should.have.property('keyword', 'Background');
      feature.background.should.have.property('name', 'a background can have name');
      feature.background.should.have.property('description', '  As well as description');

      feature.background.steps.should.have.deep.property('[0].type', 'Step');
      feature.background.steps.should.have.deep.property('[0].keyword', 'Given ');
      feature.background.steps.should.have.deep.property('[0].text', 'background step 1');

      feature.background.steps.should.have.deep.property('[1].type', 'Step');
      feature.background.steps.should.have.deep.property('[1].keyword', 'And ');
      feature.background.steps.should.have.deep.property('[1].text', 'background step 2');

      feature.background.steps.should.have.deep.property('[2].type', 'Step');
      feature.background.steps.should.have.deep.property('[2].keyword', 'And ');
      feature.background.steps.should.have.deep.property('[2].text', 'background step 3');

      feature.scenarioDefinitions[0].should.have.property('type', 'Scenario');
      feature.scenarioDefinitions[0].should.have.property('keyword', 'Scenario');
      feature.scenarioDefinitions[0].should.have.property('name', 'Scenario 1');

      feature.scenarioDefinitions[0].steps.should.have.deep.property('[0].type', 'Step');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[0].keyword', 'Given ');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[0].text', 'scenario step 1');

      feature.scenarioDefinitions[0].steps.should.have.deep.property('[1].type', 'Step');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[1].keyword', 'When ');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[1].text', 'scenario step 2');

      feature.scenarioDefinitions[0].steps.should.have.deep.property('[2].type', 'Step');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[2].keyword', 'Then ');
      feature.scenarioDefinitions[0].steps.should.have.deep.property('[2].text', 'scenario step 3');
    });

    it('should parse a feature with tags', function () {
      var featureAsString =
        '@FeatureTag1 @FeatureTag2\n' +
        'Feature: Simple feature with tags\n' +
        '\n' +
        'A simple feature to make sure we can parse tags.\n' +
        '\n' +
        '@Scenario1Tag1 @Scenario1Tag2 @Scenario1Tag3\n' +
        'Scenario: Scenario 1\n' +
        'Given scenario 1 step 1\n' +
        '\n' +
        '@Scenario2Tag1\n' +
        'Scenario: Scenario 2\n' +
        'Given scenario 2 step 1\n' +
        '\n' +
        '@ScenarioOutlineTag1\n' +
        'Scenario Outline: Scenario Outline 1\n' +
        'Given a variable <foo>\n' +
        'Examples:\n' +
        '| foo |\n' +
        '| bar |';
      var feature = gherkin.parse(featureAsString);

      feature.tags[0].name.should.equal('@FeatureTag1');
      feature.tags[1].name.should.equal('@FeatureTag2');

      feature.scenarioDefinitions[0].tags[0].name.should.equal('@Scenario1Tag1');
      feature.scenarioDefinitions[0].tags[1].name.should.equal('@Scenario1Tag2');
      feature.scenarioDefinitions[0].tags[2].name.should.equal('@Scenario1Tag3');

      feature.scenarioDefinitions[1].tags[0].name.should.equal('@Scenario2Tag1');
      feature.scenarioDefinitions[2].tags[0].name.should.equal('@ScenarioOutlineTag1');
    });

    it('should parse a feature with data tables', function () {
      var featureAsString =
        'Feature: Metadata\n' +
        '\n' +
        '  Scenario: Provide information about authors and contributors\n' +
        '    Given the "authors" property in "featurebook.json" contains the following authors\n' +
        '      | firstName | lastName    | email                  |\n' +
        '      | Henryk    | Sienkiewicz | hsienkiewicz@gmail.com |\n' +
        '      | Eliza     | Orzeszkowa  | eorzeszkowa@gmail.com  |\n' +
        '    And the "contributors" property in "featurebook.json" contains the following contributors\n' +
        '      | firstName | lastName | email               |\n' +
        '      | Juliusz   | Slowacki | jslowacki@gmail.com |\n' +
        '    When I server the directory as a system specification\n' +
        '    And open it in my Web browser' +
        '    Then the authors should be listed beneath the specification\'s title\n' +
        '    And the contributors should be listed beneath the authors\n';

      var feature = gherkin.parse(featureAsString);
      var firstScenarioDefinition = feature.scenarioDefinitions[0];

      feature.name.should.equal('Metadata');

      firstScenarioDefinition.name.should.equal('Provide information about authors and contributors');

      assertTableDataEqual(firstScenarioDefinition.steps[0].argument.rows, [
        ['firstName', 'lastName', 'email'],
        ['Henryk', 'Sienkiewicz', 'hsienkiewicz@gmail.com'],
        ['Eliza', 'Orzeszkowa', 'eorzeszkowa@gmail.com']
      ]);

      assertTableDataEqual(firstScenarioDefinition.steps[1].argument.rows, [
        ['firstName', 'lastName', 'email'],
        ['Juliusz', 'Slowacki', 'jslowacki@gmail.com']
      ]);
    });

    it('should parse a feature with doc strings', function () {
      var featureAsString =
        'Feature: Simple feature with doc string\n' +
        '\n' +
        '  Background:\n' +
        '    Given the home page with Markdown body\n' +
        '    """\n' +
        '    Awesome Blog\n' +
        '    ============\n' +
        '    Welcome to Awesome Blog!\n' +
        '    """\n' +
        '\n' +
        '  Scenario: Some scenario\n' +
        '\n' +
        '    Given a blog post named "Random" with Markdown body\n' +
        '    """\n' +
        '    Some Title, Eh?\n' +
        '    ===============\n' +
        '    Here is the first paragraph of my blog post.\n' +
        '    Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
        '    """\n' +
        '    And a comment with Markdown body\n' +
        '    """\n' +
        '    This is awesome dude!\n' +
        '    """\n' +
        '    When I open it in a web browser\n' +
        '    Then it should be displayed as a nicely formatted HTML page';

      var feature = gherkin.parse(featureAsString);
      var firstScenario = feature.scenarioDefinitions[0];

      feature.background.steps[0].argument.content.should.equal('Awesome Blog\n============\nWelcome to Awesome Blog!');

      firstScenario.steps[0].argument.content.should.equal(
        'Some Title, Eh?\n===============\nHere is the first paragraph of my blog post.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.');

      firstScenario.steps[1].argument.content.should.equal('This is awesome dude!');
    });

    it('should parse a feature with the scenario outline and data table', function () {
      var featureAsString =
        'Feature: Simple feature with scenario outline and data table\n' +
        '\n' +
        '  To make sure we can parse such a feature.\n' +
        '\n' +
        '  Scenario Outline: Getting drinks for free\n' +
        '    Given the machine has the following choices\n' +
        '      | brand  |\n' +
        '      | cola   |\n' +
        '      | sprite |\n' +
        '    When I choose <choice>\n' +
        '    Then the output tray is <empty>\n' +
        '    And the machine delivers a can of <brand> to the output tray\n' +
        '\n' +
        '  Examples:\n' +
        '    | choice | empty     | brand  |\n' +
        '    | cola   | not empty | cola   |\n' +
        '    | sprite | not empty | sprite |';

      var feature = gherkin.parse(featureAsString);

      var firstScenarioDefinition = feature.scenarioDefinitions[0];
      var firstStep = firstScenarioDefinition.steps[0];

      feature.name.should.equal('Simple feature with scenario outline and data table');

      assertStepEqual(firstStep, 'Given ', 'the machine has the following choices');

      assertTableDataEqual(firstStep.argument.rows, [
        ['brand'],
        ['cola'],
        ['sprite']
      ]);

      assertTableHeaderEqual(firstScenarioDefinition.examples[0].tableHeader, ['choice', 'empty', 'brand']);
      assertTableDataEqual(firstScenarioDefinition.examples[0].tableBody, [
        ['cola', 'not empty', 'cola'],
        ['sprite', 'not empty', 'sprite']
      ]);
    });

    it('should parse a feature with the scenario outline and two examples', function () {
      var featureAsString =
        'Feature: Withdraw Fixed Amount\n' +
        '\n' +
        '  The "Withdraw Cash" menu contains several fixed amounts to\n' +
        '  speed up transactions for users.\n' +
        '\n' +
        '  Scenario Outline: Withdraw fixed amount\n' +
        '    Given I have <Balance> in my account\n' +
        '    When I choose to withdraw the fixed amount of <Withdrawal>\n' +
        '    Then I should <Outcome>\n' +
        '    And the balance of my account should be <Remaining>\n' +
        '\n' +
        '  Examples: Successful withdrawal\n' +
        '    | Balance | Withdrawal | Outcome           | Remaining |\n' +
        '    | $500    | $50        | receive $50 cash  | $450      |\n' +
        '    | $500    | $100       | receive $100 cash | $400      |\n' +
        '\n' +
        '  Examples: Attempt to withdraw too much\n' +
        '    | Balance | Withdrawal | Outcome              | Remaining |\n' +
        '    | $100    | $200       | see an error message | $100      |\n' +
        '    | $0      | $50        | see an error message | $0        |';

      var feature = gherkin.parse(featureAsString);
      var firstScenario = feature.scenarioDefinitions[0];

      firstScenario.examples[0].name.should.equal('Successful withdrawal');
      assertTableHeaderEqual(firstScenario.examples[0].tableHeader, ['Balance', 'Withdrawal', 'Outcome', 'Remaining']);
      assertTableDataEqual(firstScenario.examples[0].tableBody, [
        ['$500', '$50', 'receive $50 cash', '$450'],
        ['$500', '$100', 'receive $100 cash', '$400']
      ]);

      firstScenario.examples[1].name.should.equal('Attempt to withdraw too much');
      assertTableHeaderEqual(firstScenario.examples[1].tableHeader, ['Balance', 'Withdrawal', 'Outcome', 'Remaining']);
      assertTableDataEqual(firstScenario.examples[1].tableBody, [
        ['$100', '$200', 'see an error message', '$100'],
        ['$0', '$50', 'see an error message', '$0']
      ]);
    });

    it('should preserve ordering when parsing scenarios and scenario outlines', function () {
      var featureAsString =
        'Feature: Simple feature with scenarios and scenario outlines\n' +
        '\n' +
        '  To make sure we can preserve the order.\n' +
        '\n' +
        '  Scenario Outline: first outline\n' +
        '    Given some variable <foo>\n' +
        '  Examples:\n' +
        '    | foo |\n' +
        '    | bar |\n' +
        '\n' +
        '  Scenario: first scenario\n' +
        '    Given some step goes here\n' +
        '\n' +
        '  Scenario Outline: second outline\n' +
        '    Given some other variable <bar>\n' +
        '  Examples:\n' +
        '    | bar |\n' +
        '    | foo |\n' +
        '\n' +
        '  Scenario: second scenario\n' +
        '    Given some other step goes here';

      var feature = gherkin.parse(featureAsString);

      feature.scenarioDefinitions[0].name.should.equal('first outline');
      feature.scenarioDefinitions[1].name.should.equal('first scenario');
      feature.scenarioDefinitions[2].name.should.equal('second outline');
      feature.scenarioDefinitions[3].name.should.equal('second scenario');
    });
  });

  /// TODO CUSTOM ASSERTS ///

  function assertStepEqual(actualStep, expectedKeyword, expectedText) {
    actualStep.keyword.should.equal(expectedKeyword);
    actualStep.text.should.equal(expectedText);
  }

  function assertTableHeaderEqual(tableHeader, expectedCellValues) {
    tableHeader.cells.map(cellValue).should.deep.equal(expectedCellValues);

    function cellValue(cell) {
      return cell.value;
    }
  }

  function assertTableDataEqual(tableData, expectedCellValues) {
    tableData.map(cellValue).should.deep.equal(expectedCellValues);

    function cellValue(row) {
      return row.cells.map(function (cell) {
        return cell.value;
      });
    }
  }

});
