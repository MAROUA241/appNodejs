var mongoose = require('mongoose');


var CollaborateurSchema = new mongoose.Schema({
	 prenom: String,
	 nom: String,
	 date_naissance: Date,
	 poste : String,
	 salaire: Number,
	 date_entree: Date,
	 date_sortie: Date,
	 mail: String,
	 numero_arrivee: Number,
	 motif: String
	 

});

module.exports = mongoose.model('Collaborateur', CollaborateurSchema);
