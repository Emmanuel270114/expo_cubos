/*
  # Food Consumption Data Schema

  1. New Tables
    - `food_consumption`
      - `id` (uuid, primary key)
      - `food_name` (text) - nombre del alimento
      - `region` (text) - región de consumo
      - `quarter` (text) - trimestre
      - `amount` (integer) - cantidad consumida en kg
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `food_consumption` table
    - Add policy for authenticated users to read data
*/

CREATE TABLE IF NOT EXISTS food_consumption (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  food_name text NOT NULL,
  region text NOT NULL,
  quarter text NOT NULL,
  amount integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Datos de ejemplo
INSERT INTO food_consumption (food_name, region, quarter, amount) VALUES
  ('Arroz', 'Norte', 'Q1', 1200),
  ('Arroz', 'Norte', 'Q2', 1300),
  ('Arroz', 'Norte', 'Q3', 1100),
  ('Arroz', 'Norte', 'Q4', 1400),
  ('Arroz', 'Sur', 'Q1', 1000),
  ('Arroz', 'Sur', 'Q2', 1100),
  ('Arroz', 'Sur', 'Q3', 900),
  ('Arroz', 'Sur', 'Q4', 1200),
  ('Frijoles', 'Norte', 'Q1', 800),
  ('Frijoles', 'Norte', 'Q2', 900),
  ('Frijoles', 'Norte', 'Q3', 850),
  ('Frijoles', 'Norte', 'Q4', 950),
  ('Frijoles', 'Sur', 'Q1', 700),
  ('Frijoles', 'Sur', 'Q2', 800),
  ('Frijoles', 'Sur', 'Q3', 750),
  ('Frijoles', 'Sur', 'Q4', 850),
  ('Maíz', 'Norte', 'Q1', 1500),
  ('Maíz', 'Norte', 'Q2', 1600),
  ('Maíz', 'Norte', 'Q3', 1400),
  ('Maíz', 'Norte', 'Q4', 1700),
  ('Maíz', 'Sur', 'Q1', 1300),
  ('Maíz', 'Sur', 'Q2', 1400),
  ('Maíz', 'Sur', 'Q3', 1200),
  ('Maíz', 'Sur', 'Q4', 1500);

ALTER TABLE food_consumption ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON food_consumption
  FOR SELECT
  TO public
  USING (true);