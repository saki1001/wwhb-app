/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// var data = {
//   items: [
//     {id: 1, name: "Napkin", image: "NAPKIN.gif"},
//     {id: 2, name: "Spoon", image: "SPOON.gif"},
//     {id: 3, name: "Fork", image: "FORK.gif"},
//     {id: 4, name: "Knife", image: "KNIFE.gif"}
//   ],
//   hats: [
//     {id: 1, name: "Witchy", image: "WITCH-HAT.gif"}
//   ]
// };

var index = 0;

var masterData = [
  {
    hat: {id: 1, name: "Witch", image: "WITCH-HAT.gif"},
    q: 'Who Wears Hat Best?',
    a: 'Napkin'
  },
  {
    hat: {id: 2, name: "Cap", image: "CAP.gif"},
    q: 'Who Wears Hat Best? Round 2',
    a: 'Spoon'
  },
  {
    hat: {id: 3, name: "Top", image: "TOP-HAT.gif"},
    q: 'Who Wears Hat Best? Round 3',
    a: 'Fork'
  },
  {
    hat: {id: 4, name: "Lady", image: "LADY-HAT.gif"},
    q: 'Who Wears Hat Best? Round 4',
    a: 'Knife'
  }
];

var data = masterData[index];

var itemStyle = {
  color: 'black',
  textAlign: 'center',
  cursor: 'pointer'
};

var itemListStyle = {
  position: 'relative',
  width: '150px',
  margin: '0 auto'
};

var itemChoiceStyle = {
  width: '100%',
  textAlign: 'center',
  'float': 'none',
  'clear': 'both'
};

var NextButton = React.createClass({
  getInitialState: function() {
    return {data: data, choice: ''};
  },
  handleButtonClick: function() {
    console.log(masterData.length);
    if(index < masterData.length - 1) {
      index++;
      data = masterData[index];
      this.props.onNextClick({data: data, choice: ''});
      this.setState({data: data, choice: ''});
    } else {
      console.log('the end');
      window.location = 'end.html';
    }
  },
  render: function() {
    var answer = this.props.data.a;
    var showHideClass = (answer === this.props.choice) ? 'show' : 'hide';
    return (
      <div className={`nextButton ${showHideClass}`} onClick={this.handleButtonClick} >
        <h2>Next &rarr;</h2>
      </div>
    );
  }
});

var Item = React.createClass({
  getInitialState: function() {
    return {data: data, choice: ''};
  },
  handleItemClick: function(e) {
    e.preventDefault();
    this.props.onItemClick({data: data, choice: this.props.name});
    this.setState({data: data, choice: this.props.name});
  },
  render: function() {
    var item = this.props.name.toLowerCase();
    return (
      <div className={`item ${item}`} style={itemStyle} onClick={this.handleItemClick} >
        <img src={`images/${this.props.image}`} alt={this.props.name} />
      </div>
    );
  }
});

var ItemChoice = React.createClass({
  rawMarkup: function(msg) {
    var rawMarkup = marked(msg.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    var msg;
    var answer = this.props.data.a;
    if (this.props.choice === '') {
      msg = '';
    } else if (this.props.choice === answer) {
      msg = 'Correct!\n' + answer + ' wears hat best.';
    } else {
      msg = 'Nope.';
    }
    return (
      <div className="itemChoice" style={itemChoiceStyle}>
        <h2>
          <span dangerouslySetInnerHTML={this.rawMarkup(msg)} />
        </h2>
      </div>
    );
  }
});

// var ItemList = React.createClass({
//   getInitialState: function() {
//     return {data: []};
//   },
//   handleItemClick: function(item) {
//     var item = this.state.data;
//     console.log(item);
//     this.setState({data: item});
//   },
//   render: function() {
//     var itemNodes = this.props.data.items.map(function(item) {
//       return (
//         <Item name={item.name} image={item.image} key={item.id}></Item>
//       );
//     });
//     return (
//       <div className="itemList" onItemClick={this.handleItemClick}>
//         {itemNodes}
//       </div>
//     );
//   }
// });

var Hat = React.createClass({
  render: function() {
    var choice = this.props.choice.toLowerCase();
    return (
      <div className={`hat ${choice}`} >
        <img src={`images/${this.props.image}`} />
      </div>
    );
  }
});


var HatBox = React.createClass({
  render: function() {
    var hat = this.props.data.hat;
    return (
      <div className="hatBox" >
        <Hat choice={this.props.choice} image={hat.image} key={hat.id}>
          {hat.name}
        </Hat>
      </div>
    );
  }
});

var MasterBox = React.createClass({
  getInitialState: function() {
    return {data: data, choice: ''};
  },
  handleItemClick: function(state) {    
    // console.log('In Box');
    // console.log(item);
    this.setState(state);
  },
  handleBodyClick: function(e) {
    if($(e.target).hasClass('masterBox')) {
      this.setState({data: data, choice: ''});
    }
  },
  handleNextClick: function(state) {
    this.setState(state);
  },
  render: function() {
    var hatClass = this.state.data.hat.name.toLowerCase();
    return (
      <div className="masterBox" onClick={this.handleBodyClick} >
        <h1>{this.state.data.q}</h1>
        <div className={`wrapperBox ${hatClass}`}>
          <HatBox choice={this.state.choice} data={this.state.data} />
          <div className="itemBox" style={itemListStyle}>
            <Item name="Napkin" image="NAPKIN.gif" onItemClick={this.handleItemClick} />
            <Item name="Spoon" image="SPOON.gif" onItemClick={this.handleItemClick} />
            <Item name="Fork" image="FORK.gif" onItemClick={this.handleItemClick} />
            <Item name="Knife" image="KNIFE.gif" onItemClick={this.handleItemClick} />
          </div>
        </div>
        <ItemChoice choice={this.state.choice} data={this.state.data} />
        <NextButton choice={this.state.choice} data={this.state.data} onNextClick={this.handleNextClick} />
      </div>
    );
  }
});


ReactDOM.render(
  <MasterBox />,
  document.getElementById('content')
);
