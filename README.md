# cdata-jdbc-mcp-server (read-only)
Our generic Model Context Protocol (MCP) Server for CData JDBC Drivers (read-only)
## Purpose
We created this read-only MCP Server to allow LLMs (like Claude Desktop) to query live data from any of over 300+ sources supported by [CData JDBC Drivers](https://www.cdata.com/jdbc).

CData JDBC Drivers connect to SaaS apps, NoSQL stores, and APIs by exposing them as relational SQL models.

This server wraps those drivers and makes their data available through a simple MCP interface, so LLMs can retrieve live information by asking natural language questions — no SQL required.

> **Note:** This project builds a read-only MCP server. For full read, write, update, delete, and action capabilities and a simplified setup, check out our free [CData MCP Servers](https://www.cdata.com/solutions/mcp).

## Setup Guide
In the guide below, `{data source}` refers to the back-end data source (e.g. Salesforce). For code snippets and commands, Salesforce is used as an example, but the patterns apply to any of our JDBC Drivers.
1. Clone the repository:
      ```bash
      git clone https://github.com/cdatasoftware/jdbc-mcp-server.git
      cd jdbc-mcp-server
      ```
2. Build the server:
      ```bash
      mvn clean install
      ``` 
      This creates the JAR file: CDataMCP-jar-with-dependencies.jar
2. Download and install a CData JDBC Driver: [https://www.cdata.com/jdbc](https://www.cdata.com/jdbc)
3. License the CData JDBC Driver (Salesforce as an example):
    * Navigate to the `lib` folder in the installation directory, typically:
        * (Windows) `C:\Program Files\CData\CData JDBC Driver for {data source}\`
        * (Mac/Linux) `/Applications/CData JDBC Driver for {data source}/`
    * Run the command `java -jar cdata.jdbc.salesforce.jar --license`
    * Enter your name, email, and "TRIAL" (or your license key).
4. Configure your connection to the data source (Salesforce as an example):
    * Run the command `java -jar cdata.jdbc.salesforce.jar` to open the Connection String utility.
      
      <img src="https://github.com/user-attachments/assets/a5b5237b-79c1-472c-8c2f-3f9eb1ac9627" title="CData JDBC Driver Connectiong String utility (Salesforce is shown)." width=384px />
    * Configure the connection string and click "Test Connection"
      > **Note:** If the data sources uses OAuth, you will need to authenticate in your browser.
    * Once successful, copy the connection string for use later.
5. Create a `.prp` file for your JDBC connection (e.g. `Salesforce.prp`) using the following properties and format:
    * **Prefix** - a prefix to be used for the tools exposed
    * **ServerName** - a name for your server
    * **ServerVersion** - a version for your server
    * **DriverPath** - the full path to the JAR file for your JDBC driver
    * **DriverClass** - the name of the JDBC Driver Class (e.g. cdata.jdbc.salesforce.SalesforceDriver)
    * **JdbcUrl** - the JDBC connection string to use with the CData JDBC Driver to connect to your data (copied from above)
    * **Tables** - leave blank to access all data, otherwise you can explicitly declare the tables you wish to create access for
      ```env
      Prefix=salesforce
      ServerName=CDataSalesforce
      ServerVersion=1.0
      DriverPath=PATH\TO\cdata.jdbc.salesforce.jar
      DriverClass=cdata.jdbc.salesforce.SalesforceDriver
      JdbcUrl=jdbc:salesforce:InitiateOAuth=GETANDREFRESH;
      Tables=
      ```

## Using the Server with Claude Desktop
1. Create the config file for Claude Desktop ( claude_desktop_config.json) to add the new MCP server, using the format below. If the file already exists, add the entry to the `mcpServers` in the config file.

      **Windows**
      ```json
      {
        "mcpServers": {
          "salesforce": {
            "command": "PATH\\TO\\java.exe",
            "args": [
              "-jar",
              "PATH\\TO\\CDataMCP-jar-with-dependencies.jar",
              "PATH\\TO\\Salesforce.prp"
            ]
          },
          ...
        }
      }
      ```
      
      **Linux/Mac**
      ```json
      {
        "mcpServers": {
          "salesforce": {
            "command": "/PATH/TO/java",
            "args": [
              "-jar",
              "/PATH/TO/CDataMCP-jar-with-dependencies.jar",
              "/PATH/TO/Salesforce.prp"
            ]
          },
          ...
        }
      }
      ```
      If needed, copy the config file to the appropriate directory (Claude Desktop as the example).
      **Windows**
      ```bash
      cp C:\PATH\TO\claude_desktop_config.json %APPDATA%\Claude\claude_desktop_config.json
      ```
      **Linux/Mac**
      ```bash
      cp /PATH/TO/claude_desktop_config.json /Users/{user}/Library/Application\ Support/Claude/claude_desktop_config.json'
      ```
2. Run or refresh your client (Claude Desktop).
   
> **Note:** You may need to fully exit or quit your Claude Desktop client and re-open it for the MCP Servers to appear.

## Running the Server
1. Run the follow the command to run the MCP Server on its own
      ```bash
      java -jar /PATH/TO/CDataMCP-jar-with-dependencies.jar /PATH/TO/Salesforce.prp
> **Note:** The server uses `stdio` so can only be used with clients that run on the same machine as the server.
## Usage Details
Once the MCP Server is configured, the AI client will be able to use the built-in tools to read, write, update, and delete the underlying data. In general, you do not need to call the tools explicitly. Simply ask the client to answer questions about the underlying data system. For example:
* "What is the correlation between my closed won opportunities and the account industry?"
* "How many open tickets do I have in the SUPPORT project?"
* "Can you tell me what calendar events I have today?"

The list of tools available and their descriptions follow:
### Tools & Descriptions
In the definitions below, `{servername}` refers to the name of the MCP Server in the config file (e.g. `salesforce` above).
* `{servername}_get_tables` - Retrieves a list of tables available in the data source. Use the `{servername}_get_columns` tool to list available columns on a table. The output of the tool will be returned in CSV format, with the first line containing column headers.
* `{servername}_get_columns` - Retrieves a list of columns for a table. Use the `{servername}_get_tables` tool to get a list of available tables. The output of the tool will be returned in CSV format, with the first line containing column headers.
* `{servername}_run_query` - Execute a SQL SELECT query

## Troubleshooting
1. If you cannot see your CData MCP Server in Claude Desktop, be sure that you have fully quit Claude Desktop (Windows: use the Task Manager, Mac: use the Activity Monitor)
2. If Claude Desktop is unable to retrieve data, be sure that you have configured your connection properly. Use the Connection String builder to create the connection string (see above) and copy the connection string into the property (.prp) file.
3. If you are having trouble connecting to your data source, contact the [CData Support Team](https://www.cdata.com/support/submit.aspx).
4. If you are having trouble using the MCP server, or have any other feedback, join the [CData Community](https://community.cdata.com).

## License
This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the [LICENSE](./LICENSE) file in the project repository.
