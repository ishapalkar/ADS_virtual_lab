import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from .cache import cache
from .preprocessor import preprocessor
from .ml_models import trainer


class DataFusion:
    """Data Fusion techniques for combining multiple sources"""

    def __init__(self):
        self.sources = {}
        self.base_model_results = None

    def create_data_sources(self):
        """Create 3 synthetic data sources from the Adult dataset"""
        if cache.exists("preprocessed_data"):
            data = cache.get("preprocessed_data")
        else:
            preprocessor.preprocess()
            data = cache.get("preprocessed_data")

        X_train = data["X_train"].copy()
        X_test = data["X_test"].copy()
        y_train = data["y_train"].copy()
        y_test = data["y_test"].copy()

        # Source A: Original features
        self.sources['A'] = {
            'X_train': X_train.iloc[:, :5],
            'X_test': X_test.iloc[:, :5],
            'y_train': y_train,
            'y_test': y_test,
            'name': 'Core Features'
        }

        # Source B: Synthetic wage features (engineered features)
        B_train = X_train.iloc[:, 5:10].copy()
        B_test = X_test.iloc[:, 5:10].copy()
        self.sources['B'] = {
            'X_train': B_train,
            'X_test': B_test,
            'y_train': y_train,
            'y_test': y_test,
            'name': 'Wage Features'
        }

        # Source C: Financial features
        C_cols = min(10, len(X_train.columns) - 10)
        if C_cols > 0:
            C_train = X_train.iloc[:, 10:10+C_cols].copy()
            C_test = X_test.iloc[:, 10:10+C_cols].copy()
        else:
            C_train = X_train.iloc[:, -5:].copy()
            C_test = X_test.iloc[:, -5:].copy()

        self.sources['C'] = {
            'X_train': C_train,
            'X_test': C_test,
            'y_train': y_train,
            'y_test': y_test,
            'name': 'Financial Features'
        }

        return self.sources

    def train_base_model(self):
        """Train base model on full dataset for comparison"""
        if not self.sources:
            self.create_data_sources()

        all_X_train = pd.concat([
            self.sources['A']['X_train'],
            self.sources['B']['X_train'],
            self.sources['C']['X_train']
        ], axis=1)
        all_X_test = pd.concat([
            self.sources['A']['X_test'],
            self.sources['B']['X_test'],
            self.sources['C']['X_test']
        ], axis=1)

        model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
        model.fit(all_X_train, self.sources['A']['y_train'])

        y_pred = model.predict(all_X_test)
        y_pred_proba = model.predict_proba(all_X_test)[:, 1]

        self.base_model_results = {
            "technique": "No Fusion (Base Model)",
            "accuracy": round(accuracy_score(self.sources['A']['y_test'], y_pred), 4),
            "f1_score": round(f1_score(self.sources['A']['y_test'], y_pred), 4),
            "roc_auc": round(roc_auc_score(self.sources['A']['y_test'], y_pred_proba), 4)
        }

        return self.base_model_results

    def early_fusion(self):
        """Merge all sources → train single model"""
        if not self.sources:
            self.create_data_sources()

        # Merge data
        X_train = pd.concat([
            self.sources['A']['X_train'],
            self.sources['B']['X_train'],
            self.sources['C']['X_train']
        ], axis=1)
        X_test = pd.concat([
            self.sources['A']['X_test'],
            self.sources['B']['X_test'],
            self.sources['C']['X_test']
        ], axis=1)

        model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
        model.fit(X_train, self.sources['A']['y_train'])

        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]

        return {
            "technique": "Early Fusion",
            "accuracy": round(accuracy_score(self.sources['A']['y_test'], y_pred), 4),
            "f1_score": round(f1_score(self.sources['A']['y_test'], y_pred), 4),
            "roc_auc": round(roc_auc_score(self.sources['A']['y_test'], y_pred_proba), 4)
        }

    def late_fusion(self):
        """Train separate models → average predictions"""
        if not self.sources:
            self.create_data_sources()

        predictions_A = []
        predictions_B = []
        predictions_C = []

        for name, source in self.sources.items():
            model = RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1)
            model.fit(source['X_train'], source['y_train'])
            preds = model.predict_proba(source['X_test'])[:, 1]

            if name == 'A':
                predictions_A = preds
            elif name == 'B':
                predictions_B = preds
            elif name == 'C':
                predictions_C = preds

        # Average predictions
        avg_predictions = (predictions_A + predictions_B + predictions_C) / 3
        y_pred = (avg_predictions > 0.5).astype(int)
        y_test_binary = (self.sources['A']['y_test'] == '>50k').astype(int)

        return {
            "technique": "Late Fusion",
            "accuracy": round(accuracy_score(y_test_binary, y_pred), 4),
            "f1_score": round(f1_score(y_test_binary, y_pred), 4),
            "roc_auc": round(roc_auc_score(y_test_binary, avg_predictions), 4)
        }

    def weighted_fusion(self):
        """Learn optimal weights for each source"""
        if not self.sources:
            self.create_data_sources()

        # Train models and get predictions
        predictions = {}
        for name, source in self.sources.items():
            model = RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1)
            model.fit(source['X_train'], source['y_train'])
            predictions[name] = model.predict_proba(source['X_test'])[:, 1]

        # Optimal weights (can be learned via cross-validation)
        # For now, use pre-calculated weights
        weights = {'A': 0.45, 'B': 0.35, 'C': 0.20}

        # Weighted average
        weighted_preds = (
            weights['A'] * predictions['A'] +
            weights['B'] * predictions['B'] +
            weights['C'] * predictions['C']
        )
        y_pred = (weighted_preds > 0.5).astype(int)
        y_test_binary = (self.sources['A']['y_test'] == '>50k').astype(int)

        return {
            "technique": "Weighted Fusion",
            "accuracy": round(accuracy_score(y_test_binary, y_pred), 4),
            "f1_score": round(f1_score(y_test_binary, y_pred), 4),
            "roc_auc": round(roc_auc_score(y_test_binary, weighted_preds), 4),
            "weights": weights
        }

    def hybrid_fusion(self):
        """Early fusion A+B → late fusion with C"""
        if not self.sources:
            self.create_data_sources()

        # Early fusion A+B
        X_AB_train = pd.concat([
            self.sources['A']['X_train'],
            self.sources['B']['X_train']
        ], axis=1)
        X_AB_test = pd.concat([
            self.sources['A']['X_test'],
            self.sources['B']['X_test']
        ], axis=1)

        model_AB = RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1)
        model_AB.fit(X_AB_train, self.sources['A']['y_train'])
        preds_AB = model_AB.predict_proba(X_AB_test)[:, 1]

        # Late fusion with C
        model_C = RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1)
        model_C.fit(self.sources['C']['X_train'], self.sources['C']['y_train'])
        preds_C = model_C.predict_proba(self.sources['C']['X_test'])[:, 1]

        # Combine
        hybrid_preds = (0.6 * preds_AB + 0.4 * preds_C)
        y_pred = (hybrid_preds > 0.5).astype(int)
        y_test_binary = (self.sources['A']['y_test'] == '>50k').astype(int)

        return {
            "technique": "Hybrid Fusion",
            "accuracy": round(accuracy_score(y_test_binary, y_pred), 4),
            "f1_score": round(f1_score(y_test_binary, y_pred), 4),
            "roc_auc": round(roc_auc_score(y_test_binary, hybrid_preds), 4)
        }

    def compare_all_techniques(self):
        """Compare all fusion techniques"""
        self.create_data_sources()

        results = [self.train_base_model()]
        results.append(self.early_fusion())
        results.append(self.late_fusion())
        results.append(self.weighted_fusion())
        results.append(self.hybrid_fusion())

        cache.set("fusion_comparison", results)
        return results


fusion = DataFusion()
