/**
 * TODO:
 * - radomize data, preserve through refresh
 * - create a router instead of redirecting to new pages
 * - create user sessions, scores?
 * 
 */

var index = 0;

var masterData = [
  {
    hat: {id: 1, name: "Witch", image: "WITCH-HAT.gif"},
    q: 'Who Wears Hat Best?',
    a: 'Napkin'
  },
  {
    hat: {id: 2, name: "Cap", image: "CAP.gif"},
    q: 'Who Wears Hat Best?',
    a: 'Spoon'
  },
  {
    hat: {id: 3, name: "Top", image: "TOP-HAT.gif"},
    q: 'Who Wears Hat Best?',
    a: 'Fork'
  },
  {
    hat: {id: 4, name: "Lady", image: "LADY-HAT.gif"},
    q: 'Who Wears Hat Best?',
    a: 'Knife'
  }
];

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  console.log(data);
  // Set randomized data
  data = array[index];
  console.log(data);
  return array;
};

var data;
if (window.location.hash) {
  var questionID = window.location.hash.split('#')[1];
  index = questionID;
  console.log('get hash');
  console.log(questionID);
  data = masterData[questionID];
} else {
  // Get randomized data
  // Figure out how to preserve random data through hash
  // shuffle(masterData);
  data = masterData[index];
}


var NextButton = React.createClass({
  getInitialState: function() {
    return {data: data, choice: ''};
  },
  handleButtonClick: function() {
    if(index < masterData.length - 1) {
      index++;
      data = masterData[index];
      window.location.hash = index;

      console.log('data, index');
      console.log(data);
      console.log(index);
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
      <div className={`item ${item}`} onClick={this.handleItemClick} >
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
      <div className="itemChoice">
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
  getInitialState: function() {
    return {data: data, choice: ''};
  },
  render: function() {
    var hat = this.props.data.hat;
    var hatClass = this.props.data.hat.name.toLowerCase();
    return (
      <div className={`hatBox ${hatClass}`} >
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
    return (
      <div className="masterBox" onClick={this.handleBodyClick} >
        <h1>{this.state.data.q}</h1>
        <div className="wrapperBox">
          <HatBox choice={this.state.choice} data={this.state.data} />
          <div className="itemBox">
            <Item name="Napkin" image="NAPKIN-2.gif" onItemClick={this.handleItemClick} />
            <Item name="Spoon" image="SPOON-2.gif" onItemClick={this.handleItemClick} />
            <Item name="Fork" image="FORK-2.gif" onItemClick={this.handleItemClick} />
            <Item name="Knife" image="KNIFE-2.gif" onItemClick={this.handleItemClick} />
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
