const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = 'https://ognepqbszzhexsuwgtfr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nbmVwcWJzenpoZXhzdXdndGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTAwMzgsImV4cCI6MjA1NjIyNjAzOH0.LyE_LPnn5-wFbAF_f7LYBjF6UUPv7Hd1bUmjGlD8CxU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImageToDatabase(base64Data) {
    try {
        console.log('base64: ', base64Data);
        //base64Image = `data:image/jpeg;base64,${base64Data}`;
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}`;

        const buffer = Buffer.from(base64Data, "base64");
        const { data, error } = await supabase.storage.from("GenerateImageAI").upload(`public/${fileName}.png`, buffer, {
            contentType: 'image/jepg'
        });

        if (error) {
            throw error;
        }

        const imageUrl = `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
        return imageUrl;
    } catch (error) {
        console.log('error: ', imageUrl);
    }
}

module.exports = {
    uploadImageToDatabase
}