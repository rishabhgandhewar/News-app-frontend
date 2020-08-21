import React from 'react';
import {
  withRouter
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash";
import './NavbarComponent.css'
import AsyncSelect from 'react-select/lib/Async';


class AutoSuggest extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedOption: null,
          };
          this.handleChange = this.handleChange.bind(this);
          this.getOptions = _.debounce(this.getOptions.bind(this), 100, {
            leading: true
          });
    }

    handleChange(selectedOption) {
      localStorage.setItem('pathname', 'search');
        this.setState({
          selectedOption: selectedOption
        });
        console.log("changed"+selectedOption.value);
        localStorage.setItem('query', selectedOption.value);
        this.props.history.push('/search');
        this.props.action();
      }
      componentWillReceiveProps = (nextProps) => {
        if(window.location.pathname !== '/search'){
            this.setState({selectedOption: null});
        }
      }
      async getOptions(inputValue) {
        if (!inputValue) {
          return [];
        }
        try {
          const response = await fetch(
            `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${inputValue}`,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": "69bdc886f9924cfc9f5452dd1930b9ca"
              }
            }
          );
          const data = await response.json();
          const resultsRaw = data.suggestionGroups[0].searchSuggestions;
          const results = resultsRaw.map(result => ({ label: result.displayText, value: result.displayText }));
        //   this.setState({ results });
          return results;
        } catch (error) {
          console.error(`Error fetching search ${inputValue}`);
        }
      };

      render(){
          return(
            <AsyncSelect
            className="searchBox"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            placeholder="Enter keyword ..."
            loadOptions={this.getOptions}
            noOptionsMessage={() => 'No Match'}
          />
          )
      }
}

export default withRouter(AutoSuggest);