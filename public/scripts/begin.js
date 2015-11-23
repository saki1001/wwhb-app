var wrapperBoxStyle = {
  width: '100%',
  height: 'auto',
  overflow: 'hidden'
};

var itemBoxStyle = {
  width: '485px',
  margin: '40px auto',
  overflow: 'hidden',
  clear: 'both'
};

var itemStyle = {
  position: 'relative',
  background: 'none',
  marginLeft: '5%',
  marginRight: '4%',
  cursor: 'default',
  top: 0,
  left: 0,
  float: 'left'
};

var NextButton = React.createClass({
  handleButtonClick: function() {
      window.location = 'game.html';
  },
  render: function() {
    return (
      <div className="nextButton show" onClick={this.handleButtonClick} >
        <h2>Start &rarr;</h2>
      </div>
    );
  }
});

var Item = React.createClass({
  render: function() {
    var item = this.props.name.toLowerCase();
    return (
      <div className={`item ${item}`} style={itemStyle} >
        <h2>{this.props.name}</h2>
        <img src={`images/${this.props.image}`} alt={this.props.name} />
      </div>
    );
  }
});

var MasterBox = React.createClass({
  render: function() {
    return (
      <div className="masterBox">
        <h1>Who Wears Hat Best?</h1>
        <div className="wrapperBox" style={wrapperBoxStyle} >
          <NextButton />
          <div className="itemBox" style={itemBoxStyle} >
            <Item name="Spoon" image="SPOON-2.gif" />
            <Item name="Fork" image="FORK-2.gif" />
            <Item name="Knife" image="KNIFE-2.gif" />
            <Item name="Napkin" image="NAPKIN-2.gif" />
          </div>
        </div>
        <h4>Game concept and illustrations by Taylor Shields</h4>
        <h4>Built by Saki Sato</h4>
      </div>
    );
  }
});


ReactDOM.render(
  <MasterBox />,
  document.getElementById('content')
);