# Architechture

`App/`
  - State: 
    1. authed: bool

`auth/`
  - Props: 
    1. authed: bool
`home/`
  - Props: 
    1. authed: bool

`saved/`
  - State:
    1. { saved securities: [array of security objects] }
  - Prop:
    1. authed : bool
  - Methods
    1. API call pulling firebase data

  - Child
    1. Individual security for list
        - Prop:
          1. { individual security object }
        - Method:
          1. API call pulling summary data from IEX API

`saved/:^firebaseKey/`
  - props
    1. security object from saved that matches clicked security
  - Children
    1. `myData`
          - props
            1. security object from saved that matches clicked security
    1. `company`
          - state:
            1. returned API data about company
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for company data
    1. `news`
          - state:
            1. returned API data about news
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for news data
    1. `financials`
          - state:
            1. returned API data about financials
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for financials data
    1. `stats`
          - state:
            1. returned API data about market data
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for market data

`watching/`
  - State:
    1. { watching securities: [array of security objects] }
  - Prop:
    1. authed : bool
  - Methods
    1. API call pulling firebase data

  - Child
    1. Individual security for list
        - Prop:
          1. { individual security object }
        - Method:
          1. API call pulling summary data from IEX API

`watching/^firebaseKey/`
  - props
    1. security object from saved that matches clicked security
  - Children
    1. `company`
          - state:
            1. returned API data about company
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for company data
    1. `news`
          - state:
            1. returned API data about news
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for news data
    1. `financials`
          - state:
            1. returned API data about financials
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for financials data
    1. `stats`
          - state:
            1. returned API data about market data
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for market data

`removed/`
  - State:
    1. { removed securities: [array of security objects] }
  - Prop:
    1. authed : bool
  - Methods
    1. API call pulling firebase data

  - Child
    1. Individual security for list
        - Prop:
          1. { individual security object }
        - Method:
          1. API call pulling summary data from IEX API

`removed/:^firebaseKey`
    - props
    1. security object from saved that matches clicked security
  - Children
    1. `myData`
          - state:
            1. returned API data about market data

          - props
            1. security object from saved that matches clicked security
          - method
            1. API call for market data
            1. comparison functions between returned data and firebase data
            
    1. `company`
          - state:
            1. returned API data about company
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for company data
    1. `news`
          - state:
            1. returned API data about news
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for news data
    1. `financials`
          - state:
            1. returned API data about financials
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for financials data
    1. `stats`
          - state:
            1. returned API data about market data
          - props
            1. security object from saved that matches clicked
          - method
            1. API call for market data