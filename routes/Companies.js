const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const scrapeData = require('../scraper');

// Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single company by ID
router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ message: 'Company not found' });
        res.json(company);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Scrape and add a new company
router.post('/', async (req, res) => {
    const { url } = req.body;
    try {
        const companyData = await scrapeData(url);
        const company = new Company({ ...companyData, website: url });
        const newCompany = await company.save();
        res.status(201).json(newCompany);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
