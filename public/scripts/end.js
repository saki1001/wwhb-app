var wrapperBoxStyle = {
  height: '320px'
};

var hatBoxStyle = {
  height: '0',
  padding: '0',
  position: 'relative',
  top: '-54px'
};

var itemBoxStyle = {
  position: 'relative',
  top: '40px'
};

var HatBox = React.createClass({
  render: function() {
    var hat = this.props.name.toLowerCase();
    var item = this.props.item.toLowerCase();
    return (
      <div className={`hatBox ${hat}`} style={hatBoxStyle} >
        <div className={`hat ${item}`}>
          <img src={`images/${this.props.image}`} alt={this.props.name} />
        </div>
      </div>
    );
  }
});

var Item = React.createClass({
  render: function() {
    var item = this.props.name.toLowerCase();
    return (
      <div className={`item ${item}`}>
        <img src={`images/${this.props.image}`} alt={this.props.name} />
      </div>
    );
  }
});

var NextButton = React.createClass({
  handleButtonClick: function() {
      window.location = 'game.html';
  },
  render: function() {
    return (
      <div className="nextButton show" onClick={this.handleButtonClick} >
        <h2>Start Over &rarr;</h2>
      </div>
    );
  }
});

var MasterBox = React.createClass({
  render: function() {
    return (
      <div className="masterBox">
        <h1>Good Job!</h1>
        <h2>Let&rsquo;s go to the party.</h2>
        <div className="wrapperBox" style={wrapperBoxStyle} >
          <HatBox name="Witch" item="Napkin" image="WITCH-HAT.gif" />
          <HatBox name="Cap" item="Spoon" image="CAP.gif" />
          <HatBox name="Top" item="Fork" image="TOP-HAT.gif" />
          <HatBox name="Lady" item="Knife" image="LADY-HAT.gif" />
          <div className="itemBox" style={itemBoxStyle} >
            <Item name="Napkin" image="NAPKIN-2.gif" />
            <Item name="Spoon" image="SPOON-2.gif" />
            <Item name="Fork" image="FORK-2.gif" />
            <Item name="Knife" image="KNIFE-2.gif" />
          </div>
        </div>
        <NextButton />
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