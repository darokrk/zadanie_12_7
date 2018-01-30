// tworzymy funkcje konstruujaca klase Column

	function Column(id, name) {
		var self = this;

		this.id = id;
		this.name = name || "Empty Column";
		this.$element = createColumn();

		// tworzymy kolumne

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete-column fa fa-trash-o').text('');
			var $columnAddCard = $('<button>').addClass('add-card fa fa-plus-square').text('');
		

			// kasowanie kolumny po kliknieciu w przycisk

			$columnDelete.click(function() {
					self.removeColumn();
			});

			// dodaj notatke po kliknieciu w przycisk

			$columnAddCard.click(function(event) {
				var cardName = prompt("Enter the name of the card");
				event.preventDefault();
				$.ajax({
    				url: baseUrl + '/card',
    				method: 'POST',
    				data: {
    					name: cardName,
    					bootcamp_kanban_column_id: self.id
    				},
    				success: function(response) {
    					if (cardName) {
        					var card = new Card(response.id, cardName);
        					self.addCard(card);
        				}
        				else if (!cardName.length) {
        					self.addCard(new Card(name));
        				}
    				}
				});
			});

			// konstruowanie kolumny

			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);

			return $column;
		}
	}

	// dodanie prototypu

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			var self = this;
			$.ajax({
      			url: baseUrl + '/column/' + self.id,
      			method: 'DELETE',
      			success: function(response){
        			self.$element.remove();
      			}
    		});
 		}
 	};